export interface ShotNarrative {
  id: string;
  number: string;
  dimensionTitle: string;
  drivingParadox: string;
  philosophicalThesis: string;
  environmentalMetaphor: string;
  poeticFragment: string;
  specTelemetry: {
    coordinate: string;
    elevation: string;
    density: string;
    resonance: string;
  };
  folder: string;
  frameCount: number;
}

export const SANCTUARY_DIMENSIONS: ShotNarrative[] = [
  {
    id: 'canopy',
    number: '01',
    dimensionTitle: 'THE AERIAL VEIL',
    drivingParadox: 'To enter the wilderness, you must surrender the illusion of conquest.',
    philosophicalThesis: 'At eighty meters above the stone floor, the conifer crown breathes forty thousand liters of moisture per hour. You are not entering nature; you are being inhaled by it.',
    environmentalMetaphor: 'Old-Growth Douglas Fir • Volumetric Mist Canopy • Sub-Alpine Drafts',
    poeticFragment: 'The wind has no history here. Only velocity and cedar memory.',
    specTelemetry: {
      coordinate: '50°06’58” N  122°57’26” W',
      elevation: '1,420 M ALTITUDE',
      density: '98.4% CANOPY CLOSURE',
      resonance: '432 Hz ACOUSTIC DAMPING',
    },
    folder: 'shot1',
    frameCount: 120,
  },
  {
    id: 'stilt-cabins',
    number: '02',
    dimensionTitle: 'SUSPENDED INTIMACY',
    drivingParadox: 'The most radical architecture is the one that touches nothing.',
    philosophicalThesis: 'Cantilevered on single-point carbon needles anchored directly into bedrock faults. No roots severed, no soil compacted. The cabins hover like black carbon lanterns in twilight mist.',
    environmentalMetaphor: 'Charred Yakisugi Cedar • Triple Optical Glass • Passivhaus Thermal Core',
    poeticFragment: 'A shelter built not to keep the wilderness out, but to let the silence in.',
    specTelemetry: {
      coordinate: '50°07’09” N  122°57’03” W',
      elevation: '1,280 M ALTITUDE',
      density: 'ZERO FOREST-FLOOR EXCAVATION',
      resonance: '0.14 W/m²K ENVELOPE',
    },
    folder: 'shot2',
    frameCount: 120,
  },
  {
    id: 'mineral-springs',
    number: '03',
    dimensionTitle: 'SUBTERRANEAN HEARTH',
    drivingParadox: 'Volcanic magma beneath; sub-zero glacial frost above.',
    philosophicalThesis: 'Rainwater filtered through two thousand meters of crushed volcanic basalt over four centuries, re-emerging at thirty-nine degrees celsius saturated with liquid silica and iron.',
    environmentalMetaphor: 'Raw Basalt Monolith • Silica Vapor • Hydrothermal Fissures',
    poeticFragment: 'Dissolve the boundary between your skin and the deep earth.',
    specTelemetry: {
      coordinate: '50°07’28” N  122°56’35” W',
      elevation: '1,150 M ALTITUDE',
      density: '39.2°C GEOTHERMAL VEIN',
      resonance: 'PH 7.8 MINERAL EQUILIBRIUM',
    },
    folder: 'shot3',
    frameCount: 120,
  },
  {
    id: 'mycelium-flora',
    number: '04',
    dimensionTitle: 'THE MYCORRHIZAL GRID',
    drivingParadox: 'The largest consciousness on earth lives entirely in darkness.',
    philosophicalThesis: 'Beneath the moss lies an unbroken fungal synapse network spanning eight thousand hectares. Trees trade carbon, warn of storms, and cradle the wounded across miles of living mycelium.',
    environmentalMetaphor: 'Bioluminescent Spore Fields • 800-Year Nurse Logs • Fiddlehead Ferns',
    poeticFragment: 'Every step you take is felt by a mind eight hundred years old.',
    specTelemetry: {
      coordinate: '50°07’43” N  122°56’14” W',
      elevation: '1,040 M ALTITUDE',
      density: '1,240 LIVING TAXA / HECTARE',
      resonance: '4.8 GHZ BIO-SYNAPSE DENSITY',
    },
    folder: 'shot4',
    frameCount: 120,
  },
  {
    id: 'horizon-vista',
    number: '05',
    dimensionTitle: 'THE INFINITE HORIZON',
    drivingParadox: 'The night is not the absence of light, but the disclosure of infinity.',
    philosophicalThesis: 'The valley falls into deep dusk indigo as cabin hearths ignite like distant embers. With zero light pollution across forty leagues, the celestial vault mirrors the primeval stillness below.',
    environmentalMetaphor: 'Bortle Class 1 Dark Sky • Obsidian Valley • Sub-Zero Stillness',
    poeticFragment: 'Here, the questions you brought with you cease to exist.',
    specTelemetry: {
      coordinate: '50°07’59” N  122°55’44” W',
      elevation: '1,650 M ALTITUDE',
      density: 'BORTLE CLASS 1 CELESTIAL DOME',
      resonance: '0.00 LUX AMBIENT LIGHT SPILL',
    },
    folder: 'shot5',
    frameCount: 120,
  },
];
