export type Evidence = 
  | "EMF Level 5"
  | "Spirit Box"
  | "Fingerprints"
  | "Ghost Orbs"
  | "Ghost Writing"
  | "Freezing Temps"
  | "DOTS Projector";

export type Ability = 
  | "Fast"
  | "Slow"
  | "Hunt Early"
  | "Hunt Late"
  | "Visible"
  | "Shy";

export interface Ghost {
  name: string;
  evidence: Evidence[];
  abilities: Ability[];
  description: string;
  bpmRange?: { min: number; max: number };
}

export const evidenceList: Evidence[] = [
  "EMF Level 5",
  "Spirit Box",
  "Fingerprints",
  "Ghost Orbs",
  "Ghost Writing",
  "Freezing Temps",
  "DOTS Projector",
];

export const abilityList: Ability[] = [
  "Fast",
  "Slow",
  "Hunt Early",
  "Hunt Late",
  "Visible",
  "Shy",
];

export const ghostDatabase: Ghost[] = [
  {
    name: "Spirit",
    evidence: ["EMF Level 5", "Spirit Box", "Ghost Writing"],
    abilities: [],
    description: "Een veelvoorkomende ghost zonder speciale eigenschappen.",
    bpmRange: { min: 60, max: 80 }
  },
  {
    name: "Wraith",
    evidence: ["EMF Level 5", "Spirit Box", "DOTS Projector"],
    abilities: ["Fast"],
    description: "Kan door muren heen bewegen en laat geen voetafdrukken achter.",
    bpmRange: { min: 75, max: 90 }
  },
  {
    name: "Phantom",
    evidence: ["Spirit Box", "Fingerprints", "DOTS Projector"],
    abilities: ["Visible"],
    description: "Verdwijnt tijdelijk bij het nemen van een foto.",
    bpmRange: { min: 65, max: 75 }
  },
  {
    name: "Poltergeist",
    evidence: ["Spirit Box", "Fingerprints", "Ghost Writing"],
    abilities: ["Fast"],
    description: "Gooit veel objecten tegelijk rond.",
    bpmRange: { min: 80, max: 100 }
  },
  {
    name: "Banshee",
    evidence: ["Fingerprints", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    description: "Jaagt op één specifiek persoon tegelijk.",
    bpmRange: { min: 50, max: 65 }
  },
  {
    name: "Jinn",
    evidence: ["EMF Level 5", "Fingerprints", "Freezing Temps"],
    abilities: ["Fast"],
    description: "Beweegt sneller als slachtoffer ver weg is.",
    bpmRange: { min: 85, max: 105 }
  },
  {
    name: "Mare",
    evidence: ["Spirit Box", "Ghost Orbs", "Ghost Writing"],
    abilities: ["Hunt Early"],
    description: "Jaagt vaker in het donker.",
    bpmRange: { min: 70, max: 85 }
  },
  {
    name: "Revenant",
    evidence: ["Ghost Orbs", "Ghost Writing", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Zeer langzaam tot het een speler ziet, dan extreem snel.",
    bpmRange: { min: 40, max: 60 }
  },
  {
    name: "Shade",
    evidence: ["EMF Level 5", "Ghost Writing", "Freezing Temps"],
    abilities: ["Shy", "Hunt Late"],
    description: "Vermijdt interactie als er meerdere spelers bij zijn.",
    bpmRange: { min: 55, max: 70 }
  },
  {
    name: "Demon",
    evidence: ["Fingerprints", "Ghost Writing", "Freezing Temps"],
    abilities: ["Hunt Early"],
    description: "Jaagt zeer frequent en agressief.",
    bpmRange: { min: 90, max: 110 }
  },
  {
    name: "Yurei",
    evidence: ["Ghost Orbs", "Freezing Temps", "DOTS Projector"],
    abilities: [],
    description: "Beïnvloedt sanity sterker dan andere ghosts.",
    bpmRange: { min: 65, max: 80 }
  },
  {
    name: "Oni",
    evidence: ["EMF Level 5", "Freezing Temps", "DOTS Projector"],
    abilities: ["Fast", "Visible"],
    description: "Zeer actief en zichtbaar wanneer spelers dichtbij zijn.",
    bpmRange: { min: 95, max: 115 }
  },
  {
    name: "Yokai",
    evidence: ["Spirit Box", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    description: "Wordt getriggerd door stemmen in de buurt.",
    bpmRange: { min: 75, max: 90 }
  },
  {
    name: "Hantu",
    evidence: ["Fingerprints", "Ghost Orbs", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Beweegt sneller in koude kamers.",
    bpmRange: { min: 60, max: 90 }
  },
  {
    name: "Goryo",
    evidence: ["EMF Level 5", "Fingerprints", "DOTS Projector"],
    abilities: ["Shy"],
    description: "DOTS alleen zichtbaar via camera, niet met blote oog.",
    bpmRange: { min: 70, max: 85 }
  },
  {
    name: "Myling",
    evidence: ["EMF Level 5", "Fingerprints", "Ghost Writing"],
    abilities: [],
    description: "Maakt minder geluid tijdens jagen.",
    bpmRange: { min: 55, max: 75 }
  },
  {
    name: "Onryo",
    evidence: ["Spirit Box", "Ghost Orbs", "Freezing Temps"],
    abilities: ["Hunt Early"],
    description: "Wordt getriggerd door het doven van vlammen.",
    bpmRange: { min: 80, max: 95 }
  },
  {
    name: "The Twins",
    evidence: ["EMF Level 5", "Spirit Box", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Kan twee interacties op verschillende plekken doen.",
    bpmRange: { min: 50, max: 100 }
  },
  {
    name: "Raiju",
    evidence: ["EMF Level 5", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Fast", "Hunt Early"],
    description: "Beweegt sneller bij elektronische apparatuur.",
    bpmRange: { min: 100, max: 120 }
  },
  {
    name: "Obake",
    evidence: ["EMF Level 5", "Fingerprints", "Ghost Orbs"],
    abilities: [],
    description: "Kan vingerafdrukken met 6 vingers achterlaten.",
    bpmRange: { min: 65, max: 80 }
  },
  {
    name: "The Mimic",
    evidence: ["Spirit Box", "Fingerprints", "Freezing Temps"],
    abilities: ["Fast", "Slow", "Visible", "Shy"],
    description: "Kan gedrag van andere ghosts nabootsen. Geeft altijd Ghost Orbs.",
    bpmRange: { min: 40, max: 120 }
  },
  {
    name: "Moroi",
    evidence: ["Spirit Box", "Ghost Writing", "Freezing Temps"],
    abilities: ["Fast"],
    description: "Wordt sneller naarmate sanity lager wordt.",
    bpmRange: { min: 85, max: 105 }
  },
  {
    name: "Deogen",
    evidence: ["Spirit Box", "Ghost Writing", "DOTS Projector"],
    abilities: ["Fast", "Slow"],
    description: "Weet altijd waar spelers zijn. Snel van ver, langzaam dichtbij.",
    bpmRange: { min: 45, max: 75 }
  },
  {
    name: "Thaye",
    evidence: ["Ghost Orbs", "Ghost Writing", "DOTS Projector"],
    abilities: ["Fast", "Slow", "Hunt Early", "Hunt Late"],
    description: "Veroudert over tijd, wordt langzamer en minder actief.",
    bpmRange: { min: 50, max: 110 }
  },
];
