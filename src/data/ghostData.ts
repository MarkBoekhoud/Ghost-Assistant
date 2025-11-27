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
    description: "Een veelvoorkomende ghost zonder speciale eigenschappen."
  },
  {
    name: "Wraith",
    evidence: ["EMF Level 5", "Spirit Box", "DOTS Projector"],
    abilities: ["Fast"],
    description: "Kan door muren heen bewegen en laat geen voetafdrukken achter."
  },
  {
    name: "Phantom",
    evidence: ["Spirit Box", "Fingerprints", "DOTS Projector"],
    abilities: ["Visible"],
    description: "Verdwijnt tijdelijk bij het nemen van een foto."
  },
  {
    name: "Poltergeist",
    evidence: ["Spirit Box", "Fingerprints", "Ghost Writing"],
    abilities: ["Fast"],
    description: "Gooit veel objecten tegelijk rond."
  },
  {
    name: "Banshee",
    evidence: ["Fingerprints", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    description: "Jaagt op één specifiek persoon tegelijk."
  },
  {
    name: "Jinn",
    evidence: ["EMF Level 5", "Fingerprints", "Freezing Temps"],
    abilities: ["Fast"],
    description: "Beweegt sneller als slachtoffer ver weg is."
  },
  {
    name: "Mare",
    evidence: ["Spirit Box", "Ghost Orbs", "Ghost Writing"],
    abilities: ["Hunt Early"],
    description: "Jaagt vaker in het donker."
  },
  {
    name: "Revenant",
    evidence: ["Ghost Orbs", "Ghost Writing", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Zeer langzaam tot het een speler ziet, dan extreem snel."
  },
  {
    name: "Shade",
    evidence: ["EMF Level 5", "Ghost Writing", "Freezing Temps"],
    abilities: ["Shy", "Hunt Late"],
    description: "Vermijdt interactie als er meerdere spelers bij zijn."
  },
  {
    name: "Demon",
    evidence: ["Fingerprints", "Ghost Writing", "Freezing Temps"],
    abilities: ["Hunt Early"],
    description: "Jaagt zeer frequent en agressief."
  },
  {
    name: "Yurei",
    evidence: ["Ghost Orbs", "Freezing Temps", "DOTS Projector"],
    abilities: [],
    description: "Beïnvloedt sanity sterker dan andere ghosts."
  },
  {
    name: "Oni",
    evidence: ["EMF Level 5", "Freezing Temps", "DOTS Projector"],
    abilities: ["Fast", "Visible"],
    description: "Zeer actief en zichtbaar wanneer spelers dichtbij zijn."
  },
  {
    name: "Yokai",
    evidence: ["Spirit Box", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    description: "Wordt getriggerd door stemmen in de buurt."
  },
  {
    name: "Hantu",
    evidence: ["Fingerprints", "Ghost Orbs", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Beweegt sneller in koude kamers."
  },
  {
    name: "Goryo",
    evidence: ["EMF Level 5", "Fingerprints", "DOTS Projector"],
    abilities: ["Shy"],
    description: "DOTS alleen zichtbaar via camera, niet met blote oog."
  },
  {
    name: "Myling",
    evidence: ["EMF Level 5", "Fingerprints", "Ghost Writing"],
    abilities: [],
    description: "Maakt minder geluid tijdens jagen."
  },
  {
    name: "Onryo",
    evidence: ["Spirit Box", "Ghost Orbs", "Freezing Temps"],
    abilities: ["Hunt Early"],
    description: "Wordt getriggerd door het doven van vlammen."
  },
  {
    name: "The Twins",
    evidence: ["EMF Level 5", "Spirit Box", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Kan twee interacties op verschillende plekken doen."
  },
  {
    name: "Raiju",
    evidence: ["EMF Level 5", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Fast", "Hunt Early"],
    description: "Beweegt sneller bij elektronische apparatuur."
  },
  {
    name: "Obake",
    evidence: ["EMF Level 5", "Fingerprints", "Ghost Orbs"],
    abilities: [],
    description: "Kan vingerafdrukken met 6 vingers achterlaten."
  },
  {
    name: "The Mimic",
    evidence: ["Spirit Box", "Fingerprints", "Freezing Temps"],
    abilities: ["Fast", "Slow", "Visible", "Shy"],
    description: "Kan gedrag van andere ghosts nabootsen. Geeft altijd Ghost Orbs."
  },
  {
    name: "Moroi",
    evidence: ["Spirit Box", "Ghost Writing", "Freezing Temps"],
    abilities: ["Fast"],
    description: "Wordt sneller naarmate sanity lager wordt."
  },
  {
    name: "Deogen",
    evidence: ["Spirit Box", "Ghost Writing", "DOTS Projector"],
    abilities: ["Fast", "Slow"],
    description: "Weet altijd waar spelers zijn. Snel van ver, langzaam dichtbij."
  },
  {
    name: "Thaye",
    evidence: ["Ghost Orbs", "Ghost Writing", "DOTS Projector"],
    abilities: ["Fast", "Slow", "Hunt Early", "Hunt Late"],
    description: "Veroudert over tijd, wordt langzamer en minder actief."
  },
];
