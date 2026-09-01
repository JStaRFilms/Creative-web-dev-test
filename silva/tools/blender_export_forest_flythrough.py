"""
SILVA — Hoh Valley 180-frame forest flythrough exporter
========================================================
Usage:
  1. Open Blender 3.6+ / 4.x with your forest scene (terrain + trees + cabins)
  2. Text Editor > Open this file > Run Script
  3. OR headless: blender your_scene.blend -P blender_export_forest_flythrough.py

What it does:
  - Creates a CatmullRom camera path matching the R3F curve in ForestCanvas.tsx
  - Steps camera + look-at along the curve for 180 frames (0..179)
  - Sets Cycles/Eevee render settings to 1920x1080 WebP 85% (object-fit:cover friendly)
  - Renders to //renders/forest/frame_####.webp

Curve matches R3F exactly:
  pts = [(0,2.2,70), (3,1.8,30), (-4,2.6,-10), (6,1.4,-55),
         (-5,1.9,-105), (2,3.4,-155), (0,4.2,-210), (0,2.0,-260)]

Tweak SPEED_CURVE below if you want ease-in/out like GSAP scrub.
"""
import bpy
import math
import mathutils
from mathutils import Vector

# --- CONFIG ---
OUTPUT_DIR = "//renders/forest/"   # relative to .blend file
FRAME_START = 1
FRAME_END = 180
RES_X, RES_Y = 1920, 1080
QUALITY = 85          # WebP quality
ENGINE = 'CYCLES'      # or 'BLENDER_EEVEE' / 'BLENDER_EEVEE_NEXT' on 4.x
SAMPLES = 128
USE_DENOISE = True

# Match R3F points (Blender Z is up, so our R3F y -> Blender z, R3F z -> Blender -y? We keep simple XZ plane.)
# R3F: Vector3(x, y, z) where y=height, z=forward. Blender: x=x, y=-z, z=y
R3F_PTS = [
    (0,    2.2,  70),
    (3,    1.8,  30),
    (-4,   2.6, -10),
    (6,    1.4, -55),
    (-5,   1.9,-105),
    (2,    3.4,-155),
    (0,    4.2,-210),
    (0,    2.0,-260),
]

def r3f_to_blender(v):
    x, y, z = v
    return Vector((x, -z, y))

BLENDER_PTS = [r3f_to_blender(p) for p in R3F_PTS]

SPEED_CURVE = lambda t: t  # linear. For eased forest: lambda t: 3*t*t -2*t*t*t (smoothstep)

def catmull_rom(p0, p1, p2, p3, t):
    # uniform Catmull-Rom
    t2 = t*t
    t3 = t2*t
    return 0.5 * (
        (2 * p1) +
        (-p0 + p2) * t +
        (2*p0 -5*p1 +4*p2 -p3) * t2 +
        (-p0 +3*p1 -3*p2 +p3) * t3
    )

def get_point_on_curve(u):
    """u in 0..1 along whole polyline with CatmullRom per segment"""
    n = len(BLENDER_PTS)
    seg_count = n - 1
    # map u to segment + local t
    # for 8 points -> 7 segments, with virtual endpoints duplicated
    # We'll duplicate first/last for p0/p3
    pts_ext = [BLENDER_PTS[0]] + BLENDER_PTS + [BLENDER_PTS[-1]]
    # pts_ext length n+2
    fu = u * seg_count
    seg = min(int(fu), seg_count-1)
    t = fu - seg
    # p0 = pts_ext[seg], p1= pts_ext[seg+1], p2= pts_ext[seg+2], p3=pts_ext[seg+3]
    p0 = pts_ext[seg]
    p1 = pts_ext[seg+1]
    p2 = pts_ext[seg+2]
    p3 = pts_ext[seg+3]
    return catmull_rom(p0, p1, p2, p3, t)

def setup_render():
    scene = bpy.context.scene
    scene.render.engine = ENGINE
    scene.render.resolution_x = RES_X
    scene.render.resolution_y = RES_Y
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'WEBP'
    scene.render.image_settings.quality = QUALITY
    scene.render.filepath = OUTPUT_DIR
    scene.frame_start = FRAME_START
    scene.frame_end = FRAME_END
    if ENGINE == 'CYCLES':
        scene.cycles.samples = SAMPLES
        scene.cycles.use_denoising = USE_DENOISE
        scene.cycles.use_adaptive_sampling = True
        scene.view_settings.view_transform = 'Filmic'
        scene.view_settings.look = 'Medium Contrast'
    else:
        # Eevee 4.x
        try:
            scene.eevee.taa_render_samples = SAMPLES
            scene.eevee.use_gtao = True
            scene.eevee.use_volumetric_shadows = True
        except:
            pass
    # color management
    scene.render.film_transparent = False

def ensure_camera():
    scene = bpy.context.scene
    cam = scene.camera
    if not cam:
        cam_data = bpy.data.cameras.new("SILVA_Cam")
        cam_data.lens = 38  # ~52deg FOV like R3F
        cam_data.clip_start = 0.1
        cam_data.clip_end = 800
        cam_obj = bpy.data.objects.new("SILVA_Cam", cam_data)
        scene.collection.objects.link(cam_obj)
        scene.camera = cam_obj
        cam = cam_obj
    cam.data.lens = 38
    return cam

def bake_animation():
    cam = ensure_camera()
    scene = bpy.context.scene

    # clear old fcurves
    cam.animation_data_clear()
    # ensure track-to empty for look-ahead stability
    target_name = "SILVA_LookTarget"
    target = bpy.data.objects.get(target_name)
    if not target:
        target = bpy.data.objects.new(target_name, None)
        target.empty_display_type = 'SPHERE'
        target.empty_display_size = 0.2
        scene.collection.objects.link(target)
    # add Track To
    constraint = cam.constraints.get("Track To")
    if not constraint:
        constraint = cam.constraints.new('TRACK_TO')
        constraint.target = target
        constraint.track_axis = 'TRACK_NEGATIVE_Z'
        constraint.up_axis = 'UP_Y'

    for f in range(FRAME_START, FRAME_END+1):
        u = (f - FRAME_START) / max(1, (FRAME_END - FRAME_START))
        u = SPEED_CURVE(u)
        # position
        pos = get_point_on_curve(u)
        # sway like R3F
        pos.x += math.sin(u * math.pi * 4) * 0.6
        pos.z += math.sin(u * math.pi * 2.2) * 0.5

        # look-ahead +0.03
        ahead = min(u + 0.03, 0.999)
        look = get_point_on_curve(ahead)
        look.z -= 0.8  # match R3F lookPos.y -=0.8 (blender z is up)

        scene.frame_set(f)
        cam.location = pos
        cam.keyframe_insert(data_path="location", frame=f)
        target.location = look
        target.keyframe_insert(data_path="location", frame=f)

    # set interpolation to Bezier for smooth
    for fc in cam.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = 'BEZIER'
    for fc in target.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = 'BEZIER'

    print(f"Baked {FRAME_END - FRAME_START +1} frames to {OUTPUT_DIR}")

def render_sequence(dry_run=True):
    scene = bpy.context.scene
    scene.render.filepath = OUTPUT_DIR + "frame_"
    if dry_run:
        print(f"[DRY RUN] Would render {FRAME_END - FRAME_START +1} WebP frames to {bpy.path.abspath(OUTPUT_DIR)}")
        print(f" Resolution {RES_X}x{RES_Y} Q{QUALITY} Engine={ENGINE}")
        # preview current frame
        scene.frame_set(FRAME_START)
        return
    bpy.ops.render.render(animation=True)

if __name__ == "__main__":
    setup_render()
    bake_animation()
    # Set dry_run=False to actually render (takes ~30-90min for 180 frames on Cycles)
    render_sequence(dry_run=True)
    print("Done. Set dry_run=False at bottom to render. Then import frames into Silva via Canvas scrub (see tools/README.md).")
