# SILVA — Asset Guide
All assets that were procedural can be swapped for real scans. You already have half of them on `E:\Assets`.

---

## 1) HDRI — where to get it
You asked "check here if none you like" — I didn't find an HDRI in `E:\Assets`. Get one here:

**Free, best first picks (Poly Haven, CC0):**
- `forest_slope_1k.hdr` or `2k` — soft overcast forest, perfect for SILVA mist: https://polyhaven.com/a/forest_slope
- `kloofendal_48d_partly_cloudy` — dappled light through trees: https://polyhaven.com/a/kloofendal_48d_partly_cloudy
- `spruit_sunrise` — dawn light matching Shot 01 (05:42): https://polyhaven.com/a/spruit_sunrise
- Alternative: `https://polyhaven.com/hdris?c=forest` filter

**Paid / higher fidelity:**
- `HDRI Haven` 8K forest sets on Gumroad: search "temperate rainforest HDRI"
- `PG-Skies` forest HDRI pack — includes foggy variants

**Where to put it:**
```
public/hdri/forest_slope_1k.hdr
```
Then in `ForestScene.tsx`:
```tsx
import { Environment } from "@react-three/drei"
<Environment files="/hdri/forest_slope_1k.hdr" background={false} intensity={0.45} />
```
Keep it at **1K for dev, 2K max for prod** — 4K HDRIs are 50MB and kill mobile. The wire is already ready, just drop the file.

**What you have locally that can fake it:** If you don't want an HDRI right now, the current `ambientLight + directionalLight` is already tuned to match `forest_slope`. You're good without it.

---

## 2) CABIN — real model where to get it
Your `cottage_textures/` is 259 faces, 2048 textures — it's the one referenced in `cottage_description.txt`. It's okay for a distant cabin but low for close-up.

**Recommended upgrades:**

| Source | File | License | Notes |
|---|---|---|---|
| **Poly Haven / Kenney** | `Cabin` by Poly Haven crew | CC0 | Low-poly blackened cedar, perfect for SILVA |
| **Sketchfab** | `Nordic Cabin` by Elin (https://skfb.ly/6WzUx) | CC BY | Search "A-Frame Cabin" -> Download GLB -> `public/models/cabin.glb` |
| **Quaternius** | `Ultimate Wood Cabin` | CC0 | Good interior detail |
| **Your existing** | `E:\Assets\Graphics\Textures\cottage_textures\` + likely `Tree1.blend` has a cabin | Own | Re-export as GLB: Blender > File > Export > glTF 2.0 > check `DRACO Compression` |

**Where to put it:**
```
public/models/silva_cabin.glb  (DRACO compressed)
public/models/silva_cabin_ao.jpg (if you bake AO)
```

**Wiring (already scaffolded):**
```tsx
import { useGLTF } from "@react-three/drei"
const { scene } = useGLTF("/models/silva_cabin.glb")
// in Cabins():
<primitive object={scene.clone()} position={[18,-3.2,-40]} scale={1.2} />
```
Run `npx gltf-pipeline -i cabin.glb -o cabin-draco.glb -d` to DRACO-compress. Auto-centering is in `threejs-and-r3f.md` pattern — I can wire it when you drop the file.

**Your `Tree1.blend` (73MB) also contains bark/leaf textures** — open it in Blender, File > External Data > Unpack, then export selected cabin/trees as GLB.

---

## 3) BARK — you have 3 excellent sets on E:\

You pointed to `E:\Assets\Graphics\Textures` — **wired already:**

| Local source | Copied to | Used as |
|---|---|---|
| `Bark08_MR_6K/Bark08_6K_BaseColor.png` (6K) | `public/textures/bark/bark_basecolor.jpg` | Trunk `map` |
| `Bark08_6K_Normal.png` | `bark_normal.png` | `normalMap` |
| `Bark08_6K_Roughness.png` | `bark_roughness.png` | `roughnessMap` |
| `Bark08_6K_AO.png` | `bark_ao.png` | `aoMap` |
| `forrest_ground_01_diff_4k.jpg` (10MB) | `ground_diff.jpg` | Terrain `map` |
| `forrest_ground_01_rough_4k.jpg` | `ground_rough.jpg` | Terrain `roughnessMap` |

**⚠️ Perf note:** Those are 4K/6K — 80MB total. On mobile that's brutal. Run this once:
```powershell
# downscale to 2K for web (requires sharp or magick)
pnpm add -D sharp
node tools/downscale_textures.mjs  # I can generate this
# or manually in Photoshop: Image > Image Size > 2048, export JPG 80%
```
The code already sets `repeat 1x2` for bark and `6x6` for ground, so 2K looks identical at distance.

**Other bark you own and could swap:**
- `Maple_Bark/Maple_Bark_2_COLOR.png` — warmer, more Pacific Northwest maple. Copy to `bark_alt` and I can randomize per trunk.
- `pine_bark_4k.blend/textures/pine_bark_diff_4k.jpg` — darker, more charred cedar (matches SILVA's blackened cedar cabins)

Tell me which bark feel you want: **dark charred cedar (current Bark08)** vs **warm maple** vs **pine**.

---

## 4) VOICEOVER — what it should say

**Tone:** Whispered, close-miked, no music bed — just forest foley (drip, wind through needles). Female or soft male, Japanese/Scandinavian minimal. 42 seconds total, scrubbed to scroll.

**Script (timed to 7 chapters, each line appears as its shot fades in):**

```
[00:00 - Shot 01 DAWN - silence, single bird, fog]
"What if time moved... at the speed of trees?"

[00:07 - Shot 02 CANOPY - light shafts, soft exhale]
"Five hundred years to grow this tall."
"You're asked to do nothing."

[00:14 - Shot 03 CLEARING - cabins appear, lantern flickers]
"Three cabins. No more."
"Cedar. Stone. Lantern light."

[00:22 - Shot 04 RIVER - water cold, breath visible]
"The Hoh doesn't flow. It breathes."
"Seven degrees. You enter slowly."

[00:30 - Shot 05 AFTERNOON - chair, book, record crackle]
"Light comes in shafts. Not floods."
"You remember how to read."

[00:36 - Shot 06 DUSK - fire, rain on roof]
"At night, the forest comes inside."

[00:40 - Shot 07 STAY - pause, then very quiet]
"Stay three nights. Leave on forest time."
"Silva — Hoh Valley."
```

**Delivery notes for TTS / voice actor:**
- Pace: 0.82x, breaths between lines, not rushed
- Record at 48kHz mono, -16 LUFS, leave 0.8s head/tail silence per line
- File: `public/audio/silva_voiceover.mp3` + `silva_ambient_forest.mp3` (or one mixed file)
- Hooking it up: I can make audio scrubbed to `progress` (like hybrid video) — volume ducks when fire shot, reverb when canopy. Say the word and I'll wire `WebAudio + ScrollTrigger`.

**If you want me to generate a draft now:** I can call Kokoro TTS (female, `af_sarah`) and drop `silva_voiceover_draft.mp3` in public/audio for timing test.

---

## 5) TERRAIN / TREES / CABINS / FOG — where to get or how current works

| Element | Current (procedural, zero deps) | Upgrade path (asset) |
|---|---|---|
| **Terrain** | `PlaneGeometry 800x800 128x128` with sine displace + corridor carve — `ForestScene.tsx:27` | **Heightmap:** Export a real Hoh Valley heightmap from https://terrain.party or Blender GIS, 2048px PNG, use as `displacementMap`. Or use your `forrest_ground_01_disp_4k.png` (already on E:) as displacement. |
| **Trees** | `InstancedMesh` 820 cones/cylinders, random scale 0.7-1.6, trunkH 7-14 — `ForestScene.tsx:57` | **Real trees:** `MTree` Blender addon (free) -> generate 3 variants (hemlock, spruce, cedar) -> export as `tree_A.glb` instanced. Or buy `3D Shaker Forest Pack` ($19) or use `Tree1.blend` you own (73MB) -> unpack -> export 2 LODs. Keep instancing, just swap geometry. |
| **Cabins** | 3 box+cone low poly + emissive window — `ForestScene.tsx:145` | See CABIN section above. Also `weathered_planks_4k.blend` on E: has perfect cabin siding textures — copy `weathered_planks_diff` to `public/textures/cabin/`. |
| **Fog / Mist** | `fogExp2 #0E1410 0.012` + dust `Points` 1200 — `ForestScene.tsx:225 + 182` | **Volumetric:** Add `<Fog>` + `drei/Cloud` or shader `FogVolume` (GLSL FBM). Your `pine_bark_4k.blend` scene has a volumetrics setup you can copy. Cheap upgrade: add 3x `<mesh><sphereGeometry>` with `ShaderMaterial` depth fade at y=4, opacity scrubbed to progress. |
| **River** | `Plane 16x520` dark `StandardMaterial` — `ForestScene.tsx:213` | Replace with `Water` from `three/examples/jsm/objects/Water.js` + normal map `ganges_river_pebbles_4k` (you have it on E:). 1 line: `<Water textureWidth={512} ... />` |
| **Leaves / Ground scatter** | Procedural only | You have `GreenLeaf04_MR_4K`, `AutumnLeaf20_3K`, `plants_foliage_study/scene.gltf` — scatter with `InstancedMesh` like trees. |

**Quick wins with what you already own without buying anything:**
1. Downscale `Bark08 + forrest_ground` to 2K (perf)
2. Drop `weathered_planks` textures onto cabin boxes
3. Add `forrest_ground_01_nor_gl_4k.exr` (convert to jpg) as terrain normal
4. Import `Tree1.blend` trees as 2 LOD GLBs -> keep instancing perf
5. River -> Water + `ganges_river_pebbles` normal

Want me to wire any of these next? Just say "wire ground normal" / "wire real cabin" / "generate voiceover draft" and I'll do it.
