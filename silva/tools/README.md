# Silva Tools

## 1) Blender forest flythrough (180 frames)
File: `tools/blender_export_forest_flythrough.py`

**Quick start:**
1. Open your Blender forest scene (terrain + trees + cabins) in Blender 4.x
2. Text Editor > Open > `blender_export_forest_flythrough.py` > Run
3. Check Camera `SILVA_Cam` animates through the forest (scrub timeline 1..180)
4. To render: edit bottom line to `render_sequence(dry_run=False)` and Run again. Or CLI:
   ```
   blender your_forest.blend -P tools/blender_export_forest_flythrough.py -- --render
   ```
5. Output: `//renders/forest/frame_0001.webp` .. `frame_0180.webp` (1920x1080, WebP 85%)

**Hooking into Silva (hybrid baked mode):**
Drop the frames into `public/frames/forest/` and swap `ForestCanvas.tsx` to use `<CanvasScrub frames={frames} progress={progressRef} />` — template included in `tools/canvas_scrub_template.tsx`.

## 2) Local textures you already have (wired)
Copied from `E:\Assets\Graphics\Textures\` into `public/textures/`:
- `bark/bark_basecolor.jpg` <- Bark08_6K_BaseColor.png
- `bark/bark_normal.png`
- `bark/bark_roughness.png` 
- `ground/ground_diff.jpg` <- forrest_ground_01_diff_4k.jpg
- `ground/ground_rough.jpg`

Terrain now tries to load these; falls back to flat color if missing.

To add more:
```
public/textures/bark/Maple_Bark_2_COLOR.png -> wire as second trunk variant
public/textures/ground/forrest_ground_01_disp_4k.png -> use as displacement map
```

## 3) HDRI / Cabin sourcing
See `ASSET_GUIDE.md` in project root.
