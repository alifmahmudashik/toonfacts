// Light presets per time of day. The sun is CAMERA-RELATIVE and frozen per shot (world.ts update()):
// az = degrees from the shot camera's forward axis (0 = sun straight ahead = backlight, +90 = screen right,
// 180 = behind camera), el = elevation. lit/shade/lift are LINEAR RGB multipliers for shade.ts (may exceed 1).
// Field names follow lighting.md 9.1 exactly (the CHAR and POST agents read them); values are tuned on renders.
type C3 = [number, number, number];
export type LightPreset = {
  az: number; el: number;
  lit: C3; shade: C3; lift: C3; lambert: number; sideK: number; term: number;      // world two-tone (shade.ts)
  charTint: C3; charShade: number; charGrad: number; bodyGrad: number; sideTint: C3; // character cards (cast.ts)
  blob: C3; actorShadow: boolean;                                                    // contact blobs / card shadows
  top: string; hor: string; skyCurve: C3; fog: string; fogNear: number; fogFar: number; sunDisc: string; // depth.md 6.5
  sunCol: string; sunI: number; sky: string; ground: string; hemiI: number;         // three lights (unpatched mats only)
  bias: number; normalBias: number;
};
export const LIGHTS: Record<"day" | "golden" | "interior" | "night" | "lamp", LightPreset> = {
  day: {
    az: 75, el: 48,
    lit: [1.58, 1.5, 1.33], shade: [0.3, 0.29, 0.36], lift: [0.05, 0.06, 0.11], lambert: 0.35, sideK: 0.84, term: 0.2,
    charTint: [1.0, 0.94, 0.92], charShade: 0.86, charGrad: 0.07, bodyGrad: 0.2, sideTint: [0.92, 0.90, 0.96],
    blob: [0.62, 0.58, 0.58], actorShadow: false,
    top: "#3e7fd2", hor: "#b8d0ec", skyCurve: [0.0, 0.5, 0.6], fog: "#b8d0ec", fogNear: 25, fogFar: 300, sunDisc: "#000000",
    sunCol: "#fff3e0", sunI: 2.8, sky: "#dcecff", ground: "#b49a78", hemiI: 0.55,
    bias: -0.00025, normalBias: 0.015,
  },
  golden: {
    az: 6, el: 7,
    lit: [1.5, 0.68, 0.24], shade: [0.15, 0.15, 0.3], lift: [0.04, 0.06, 0.17], lambert: 0.35, sideK: 0.82, term: 0.07,
    charTint: [1.0, 0.78, 0.56], charShade: 0.88, charGrad: 0.1, bodyGrad: 0.25, sideTint: [0.85, 0.80, 0.95],
    blob: [0.75, 0.74, 0.9], actorShadow: true,
    top: "#6a4f8c", hor: "#ffd08a", skyCurve: [0.05, 0.6, 1.0], fog: "#efb489", fogNear: 50, fogFar: 380, sunDisc: "#ffcf9e",
    sunCol: "#ffab5e", sunI: 5.5, sky: "#d8b0b8", ground: "#8a6a60", hemiI: 0.5,
    bias: -0.0006, normalBias: 0.03,
  },

  /* ------------------------------------------------------------------
   * interior / night / lamp
   *
   * Until these existed the only presets were day and golden, both
   * outdoor sunlight, so every hall, museum, trench and bar was lit like
   * a field at noon. That is the main reason finished videos looked flat
   * beside the reference channel, whose frames sit at a median saturation
   * of 0.52 against our 0.20.
   *
   * These are STARTING VALUES, not finished ones. Tune each on real
   * renders against references/frames/ and keep tuning until
   * `python3 tools/check_look.py` passes. Raising saturation here, in the
   * albedo and the lit/shade split, is what the check is asking for; a
   * late grade cannot put back colour the shading never produced.
   * ------------------------------------------------------------------ */

  // Room with one window or a high lamp: warm key, cool shade, dark ceiling.
  interior: {
    az: 55, el: 32,
    lit: [1.42, 1.22, 0.92], shade: [0.22, 0.21, 0.30], lift: [0.04, 0.04, 0.09], lambert: 0.38, sideK: 0.80, term: 0.12,
    charTint: [1.0, 0.90, 0.78], charShade: 0.80, charGrad: 0.12, bodyGrad: 0.26, sideTint: [0.84, 0.82, 0.95],
    blob: [0.46, 0.43, 0.50], actorShadow: true,
    top: "#2a2030", hor: "#6b5648", skyCurve: [0.1, 0.55, 0.9], fog: "#4a3b3a", fogNear: 12, fogFar: 90, sunDisc: "#000000",
    sunCol: "#ffd9a0", sunI: 3.4, sky: "#4b4256", ground: "#5a4436", hemiI: 0.30,
    bias: -0.0004, normalBias: 0.02,
  },

  // Moonlit blue key, deep blue-violet shade, warm practicals as contrast.
  night: {
    az: 110, el: 26,
    lit: [0.70, 0.84, 1.35], shade: [0.12, 0.13, 0.28], lift: [0.03, 0.04, 0.12], lambert: 0.40, sideK: 0.78, term: 0.10,
    charTint: [0.80, 0.86, 1.08], charShade: 0.78, charGrad: 0.13, bodyGrad: 0.28, sideTint: [0.74, 0.78, 1.0],
    blob: [0.30, 0.32, 0.52], actorShadow: true,
    top: "#101c3f", hor: "#2d4a78", skyCurve: [0.05, 0.5, 0.85], fog: "#24395e", fogNear: 20, fogFar: 180, sunDisc: "#dfe8ff",
    sunCol: "#9db6ee", sunI: 2.2, sky: "#1b2a4d", ground: "#222a3a", hemiI: 0.26,
    bias: -0.0004, normalBias: 0.02,
  },

  // A single practical in frame (candle, bulb, screen): tight warm pool, hard falloff.
  lamp: {
    az: 20, el: 18,
    lit: [1.60, 1.14, 0.62], shade: [0.16, 0.15, 0.24], lift: [0.03, 0.03, 0.07], lambert: 0.42, sideK: 0.76, term: 0.08,
    charTint: [1.0, 0.84, 0.62], charShade: 0.76, charGrad: 0.15, bodyGrad: 0.30, sideTint: [0.80, 0.76, 0.92],
    blob: [0.38, 0.32, 0.34], actorShadow: true,
    top: "#1a1420", hor: "#5a3a28", skyCurve: [0.1, 0.6, 1.0], fog: "#3a2620", fogNear: 8, fogFar: 70, sunDisc: "#000000",
    sunCol: "#ffc070", sunI: 4.2, sky: "#3a2e3c", ground: "#4a3024", hemiI: 0.22,
    bias: -0.0005, normalBias: 0.025,
  },
};

/** world-only look per light (sky stops by elevation in degrees, river colours, cloud palette). All colours are
 *  ON-SCREEN targets under the current PBR-Neutral tone map; world.ts pre-inverts the tone map (shade.ts untone). */
export type WorldLook = {
  sky: { c: string[]; e: number[] };                         // 5 stops: c[i] at elevation e[i] (deg), smoothstep between
  water: { near: string; mid: string; far: string; crest: string; trough: string; glint: string; shade: C3 };
  bounce: C3;                                                 // shade.ts uBounce: albedo x bounce on shaded faces turned to the lens
  sat: number;                                                // shade.ts uSat: world albedo saturation (1 = as painted)
  cloud: { lit: string; mid: string; shade: string };
};
export const LOOK: Record<"day" | "golden" | "interior" | "night" | "lamp", WorldLook> = {
  day: {
    // depth.md 2.2: horizon #9fb6e6 just above the skyline, upper sky #5e93d9 at ~20 deg (grade: frame top #5997e2)
    sky: { c: ["#b8d0ec", "#9cbfea", "#6a9fe0", "#4f8cdb", "#3373cc"], e: [0, 3, 8, 16, 40] },
    water: { near: "#22a7b6", mid: "#167fb2", far: "#1a5596", crest: "#7ddfe8", trough: "#0e4a80", glint: "#ffffff", shade: [0.5, 0.56, 0.72] },
    cloud: { lit: "#fbf8f1", mid: "#e1e5f3", shade: "#c3cbe9" },
    bounce: [0, 0, 0],
    sat: 1.08,
  },
  golden: {
    // sunset, not dusk: #ffd08a horizon, peach/orange through ~10 deg, warm rose at 20, muted warm mauve only near the top
    // (the golden grade adds ~+11/255 blue to shadows/mids, so these lean warm)
    sky: { c: ["#ffc47c", "#f7ae78", "#e8967c", "#c4848e", "#8a6f8a"], e: [0, 4, 10, 20, 40] },
    water: { near: "#1e3a6e", mid: "#355f96", far: "#d4a48e", crest: "#d9a088", trough: "#16294f", glint: "#ffe2b0", shade: [0.42, 0.46, 0.72] },
    cloud: { lit: "#ffd2a8", mid: "#f2a08f", shade: "#a98fc4" },
    bounce: [0.04, 0.02, 0.0],
    sat: 1.1,
  },

  /* Interiors have no sky: "sky" here is the ceiling and wall tops, which must
   * go dark so the room has a top. sat sits above the outdoor presets on
   * purpose; the reference channel's interiors are its most saturated frames. */
  interior: {
    sky: { c: ["#6b5648", "#53423c", "#3e3139", "#2e2430", "#221a28"], e: [0, 4, 10, 20, 40] },
    water: { near: "#3a4f66", mid: "#2b3d53", far: "#22303f", crest: "#6d8aa6", trough: "#182331", glint: "#ffe6bd", shade: [0.42, 0.44, 0.60] },
    cloud: { lit: "#f0dcc0", mid: "#c9ab94", shade: "#8a7080" },
    bounce: [0.05, 0.03, 0.01],
    sat: 1.22,
  },
  night: {
    sky: { c: ["#2d4a78", "#233c66", "#1a2e52", "#13223f", "#0c162c"], e: [0, 4, 10, 20, 40] },
    water: { near: "#1d4f72", mid: "#143a5c", far: "#0f2744", crest: "#6fb2d8", trough: "#0a1a30", glint: "#dfe8ff", shade: [0.34, 0.40, 0.66] },
    cloud: { lit: "#9db6ee", mid: "#6478a8", shade: "#3c4668" },
    bounce: [0.0, 0.01, 0.05],
    sat: 1.18,
  },
  lamp: {
    sky: { c: ["#5a3a28", "#462e24", "#34221f", "#261a1e", "#1a1420"], e: [0, 4, 10, 20, 40] },
    water: { near: "#4a3324", mid: "#38261e", far: "#281c18", crest: "#c08a52", trough: "#1a1210", glint: "#ffd79a", shade: [0.40, 0.36, 0.44] },
    cloud: { lit: "#ffc894", mid: "#c08a64", shade: "#6e5058" },
    bounce: [0.07, 0.04, 0.0],
    sat: 1.24,
  },
};
