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
  | "Normal"
  | "Slow"
  | "Hunt Early"
  | "Hunt Late"
  | "Visible"
  | "Invisible"
  | "Shy";

export type EvidenceState = "unknown" | "present" | "excluded";

export interface Ghost {
  name: string;
  evidence: Evidence[];
  abilities: Ability[];
  description: string;
  bpmRange?: { min: number; max: number };
  spmRange?: { min: number; max: number };
  tips?: string[];
  strengths?: string[];
  weaknesses?: string[];
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
    bpmRange: { min: 60, max: 80 },
    spmRange: { min: 100, max: 170 },
    tips: ["Gebruik wierook om de ghost te verdrijven", "Effectief bij smudging"],
    strengths: ["Geen bijzondere krachten"],
    weaknesses: ["Wierook is extra effectief en voorkomt jagen voor langere tijd"]
  },
  {
    name: "Wraith",
    evidence: ["EMF Level 5", "Spirit Box", "DOTS Projector"],
    abilities: ["Fast"],
    description: "Kan door muren heen bewegen en laat geen voetafdrukken achter.",
    bpmRange: { min: 75, max: 90 },
    spmRange: { min: 100, max: 170 },
    tips: ["Check zoutsporen - Wraith laat geen voetafdrukken achter in zout", "Kan teleporteren naar spelers"],
    strengths: ["Laat nooit voetafdrukken achter", "Kan door deuren en muren teleporteren"],
    weaknesses: ["Wordt beschadigd door zout te raken"]
  },
  {
    name: "Phantom",
    evidence: ["Spirit Box", "Fingerprints", "DOTS Projector"],
    abilities: ["Visible"],
    description: "Verdwijnt tijdelijk bij het nemen van een foto.",
    bpmRange: { min: 65, max: 75 },
    spmRange: { min: 100, max: 170 },
    tips: ["Maak een foto om de ghost te laten verdwijnen", "Kijken naar Phantom verlaagt sanity sneller"],
    strengths: ["Kijken naar een Phantom verlaagt sanity aanzienlijk"],
    weaknesses: ["Foto nemen zorgt dat hij tijdelijk verdwijnt"]
  },
  {
    name: "Poltergeist",
    evidence: ["Spirit Box", "Fingerprints", "Ghost Writing"],
    abilities: ["Fast"],
    description: "Gooit veel objecten tegelijk rond.",
    bpmRange: { min: 80, max: 100 },
    spmRange: { min: 100, max: 170 },
    tips: ["Let op veel bewegende objecten tegelijk", "Kan meerdere items tegelijk gooien"],
    strengths: ["Kan veel objecten tegelijk gooien", "Effectiever in kamers met veel items"],
    weaknesses: ["Bijna ineffectief in lege kamers"]
  },
  {
    name: "Banshee",
    evidence: ["Fingerprints", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    description: "Jaagt op één specifiek persoon tegelijk.",
    bpmRange: { min: 50, max: 65 },
    spmRange: { min: 100, max: 170 },
    tips: ["Focust op één doelwit tot die dood is", "Gebruik parabolic mic voor uniek geluid"],
    strengths: ["Focust alleen op zijn doelwit tijdens een hunt"],
    weaknesses: ["Kruisbeeld heeft grotere invloedssfeer"]
  },
  {
    name: "Jinn",
    evidence: ["EMF Level 5", "Fingerprints", "Freezing Temps"],
    abilities: ["Fast"],
    description: "Beweegt sneller als slachtoffer ver weg is.",
    bpmRange: { min: 85, max: 105 },
    spmRange: { min: 100, max: 250 },
    tips: ["Schakel de zekeringkast uit om hem te vertragen", "Sneller op afstand"],
    strengths: ["Beweegt sneller als het doelwit ver weg is"],
    weaknesses: ["Kan zijn vermogen niet gebruiken als stroom uit is"]
  },
  {
    name: "Mare",
    evidence: ["Spirit Box", "Ghost Orbs", "Ghost Writing"],
    abilities: ["Hunt Early"],
    description: "Jaagt vaker in het donker.",
    bpmRange: { min: 70, max: 85 },
    spmRange: { min: 100, max: 170 },
    tips: ["Houd lichten aan om hunts te voorkomen", "Schakelt vaak lichten uit"],
    strengths: ["Grotere kans om aan te vallen in het donker"],
    weaknesses: ["Houd lichten aan om hunts te verminderen"]
  },
  {
    name: "Revenant",
    evidence: ["Ghost Orbs", "Ghost Writing", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Zeer langzaam tot het een speler ziet, dan extreem snel.",
    bpmRange: { min: 40, max: 60 },
    spmRange: { min: 50, max: 300 },
    tips: ["Verstop je als hij je niet kan zien", "Extreem snel als hij je ziet"],
    strengths: ["Beweegt extreem snel wanneer hij een doelwit jaagt"],
    weaknesses: ["Beweegt zeer langzaam als hij geen doelwit heeft"]
  },
  {
    name: "Shade",
    evidence: ["EMF Level 5", "Ghost Writing", "Freezing Temps"],
    abilities: ["Shy", "Hunt Late"],
    description: "Vermijdt interactie als er meerdere spelers bij zijn.",
    bpmRange: { min: 55, max: 70 },
    spmRange: { min: 100, max: 170 },
    tips: ["Blijf alleen voor meer activiteit", "Zeer verlegen met meerdere spelers"],
    strengths: ["Minder actief bij meerdere spelers"],
    weaknesses: ["Jaagt niet als er meerdere spelers in de buurt zijn"]
  },
  {
    name: "Demon",
    evidence: ["Fingerprints", "Ghost Writing", "Freezing Temps"],
    abilities: ["Hunt Early"],
    description: "Jaagt zeer frequent en agressief.",
    bpmRange: { min: 90, max: 110 },
    spmRange: { min: 100, max: 170 },
    tips: ["Zeer agressief - wees voorbereid op hunts", "Kan jagen bij hogere sanity"],
    strengths: ["Jaagt vaker dan andere ghosts", "Kan bij hogere sanity al jagen"],
    weaknesses: ["Ouija board vragen kosten minder sanity"]
  },
  {
    name: "Yurei",
    evidence: ["Ghost Orbs", "Freezing Temps", "DOTS Projector"],
    abilities: [],
    description: "Beïnvloedt sanity sterker dan andere ghosts.",
    bpmRange: { min: 65, max: 80 },
    spmRange: { min: 100, max: 170 },
    tips: ["Smudging in de kamer beperkt beweging", "Verlaagt sanity sneller"],
    strengths: ["Sterker effect op sanity van spelers"],
    weaknesses: ["Smudging in zijn kamer beperkt zijn beweging"]
  },
  {
    name: "Oni",
    evidence: ["EMF Level 5", "Freezing Temps", "DOTS Projector"],
    abilities: ["Fast", "Visible"],
    description: "Zeer actief en zichtbaar wanneer spelers dichtbij zijn.",
    bpmRange: { min: 95, max: 115 },
    spmRange: { min: 100, max: 170 },
    tips: ["Actiever met meer mensen in de kamer", "Vaker zichtbaar tijdens hunts"],
    strengths: ["Actiever met meer spelers in de buurt", "Gooit objecten met meer kracht"],
    weaknesses: ["Hogere activiteit maakt identificatie makkelijker"]
  },
  {
    name: "Yokai",
    evidence: ["Spirit Box", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    description: "Wordt getriggerd door stemmen in de buurt.",
    bpmRange: { min: 75, max: 90 },
    spmRange: { min: 100, max: 170 },
    tips: ["Wees stil in de buurt van de ghost", "Praten triggert hunts"],
    strengths: ["Praten in de buurt maakt hem agressiever"],
    weaknesses: ["Kan alleen spelers horen die dichtbij zijn tijdens hunt"]
  },
  {
    name: "Hantu",
    evidence: ["Fingerprints", "Ghost Orbs", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Beweegt sneller in koude kamers.",
    bpmRange: { min: 60, max: 90 },
    spmRange: { min: 100, max: 270 },
    tips: ["Houd de zekeringkast aan voor warmte", "Let op bevriezende adem"],
    strengths: ["Beweegt sneller in koudere gebieden"],
    weaknesses: ["Beweegt langzamer in warmere gebieden"]
  },
  {
    name: "Goryo",
    evidence: ["EMF Level 5", "Fingerprints", "DOTS Projector"],
    abilities: ["Shy"],
    description: "DOTS alleen zichtbaar via camera, niet met blote oog.",
    bpmRange: { min: 70, max: 85 },
    spmRange: { min: 100, max: 170 },
    tips: ["DOTS moet via videocamera bekeken worden", "Verlaat de kamer niet vaak"],
    strengths: ["Alleen zichtbaar via DOTS op camera"],
    weaknesses: ["Verschijnt zelden ver van zijn favoriete kamer"]
  },
  {
    name: "Myling",
    evidence: ["EMF Level 5", "Fingerprints", "Ghost Writing"],
    abilities: [],
    description: "Maakt minder geluid tijdens jagen.",
    bpmRange: { min: 55, max: 75 },
    spmRange: { min: 100, max: 170 },
    tips: ["Luister naar voetstappen - zeer stil tijdens hunt", "Parabolic mic voor geluiden"],
    strengths: ["Maakt minder geluid tijdens hunts"],
    weaknesses: ["Maakt meer geluiden via parabolic mic"]
  },
  {
    name: "Onryo",
    evidence: ["Spirit Box", "Ghost Orbs", "Freezing Temps"],
    abilities: ["Hunt Early"],
    description: "Wordt getriggerd door het doven van vlammen.",
    bpmRange: { min: 80, max: 95 },
    spmRange: { min: 100, max: 170 },
    tips: ["Kaarsen kunnen hunts voorkomen", "Vlammen doven triggert hunts"],
    strengths: ["Gedoofde vlam kan een hunt triggeren"],
    weaknesses: ["Vlammen voorkomen dat hij jaagt"]
  },
  {
    name: "The Twins",
    evidence: ["EMF Level 5", "Spirit Box", "Freezing Temps"],
    abilities: ["Fast", "Slow"],
    description: "Kan twee interacties op verschillende plekken doen.",
    bpmRange: { min: 50, max: 100 },
    spmRange: { min: 100, max: 190 },
    tips: ["Let op gelijktijdige interacties op verschillende plekken", "Eén twin is sneller dan de andere"],
    strengths: ["Kunnen op meerdere locaties tegelijk interacteren"],
    weaknesses: ["Vaak zullen ze tegelijk interacteren"]
  },
  {
    name: "Raiju",
    evidence: ["EMF Level 5", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Fast", "Hunt Early"],
    description: "Beweegt sneller bij elektronische apparatuur.",
    bpmRange: { min: 100, max: 120 },
    spmRange: { min: 100, max: 250 },
    tips: ["Schakel elektronica uit tijdens hunts", "Sneller bij actieve apparatuur"],
    strengths: ["Beweegt sneller bij elektronische apparatuur"],
    weaknesses: ["Verstoort elektronica vaker waardoor hij makkelijk te vinden is"]
  },
  {
    name: "Obake",
    evidence: ["EMF Level 5", "Fingerprints", "Ghost Orbs"],
    abilities: [],
    description: "Kan vingerafdrukken met 6 vingers achterlaten.",
    bpmRange: { min: 65, max: 80 },
    spmRange: { min: 100, max: 170 },
    tips: ["Let op 6-vinger afdrukken", "Vingerafdrukken verdwijnen sneller"],
    strengths: ["Kan vorm veranderen waardoor bewijs minder zichtbaar is"],
    weaknesses: ["Laat soms unieke 6-vinger afdrukken achter"]
  },
  {
    name: "The Mimic",
    evidence: ["Spirit Box", "Fingerprints", "Freezing Temps", "Ghost Orbs"],
    abilities: ["Fast", "Slow", "Visible", "Shy"],
    description: "Kan gedrag van andere ghosts nabootsen. Geeft altijd Ghost Orbs.",
    bpmRange: { min: 40, max: 120 },
    spmRange: { min: 50, max: 300 },
    tips: ["Ghost Orbs zijn extra bewijs (niet primair)", "Kopieert gedrag van andere ghosts"],
    strengths: ["Kan het gedrag van elke andere ghost nabootsen"],
    weaknesses: ["Geeft altijd Ghost Orbs als extra bewijs"]
  },
  {
    name: "Moroi",
    evidence: ["Spirit Box", "Ghost Writing", "Freezing Temps"],
    abilities: ["Fast"],
    description: "Wordt sneller naarmate sanity lager wordt.",
    bpmRange: { min: 85, max: 105 },
    spmRange: { min: 100, max: 220 },
    tips: ["Sanity pillen zijn cruciaal", "Spirit Box kan je vervloeken"],
    strengths: ["Beweegt sneller bij lagere sanity", "Kan spelers vervloeken via Spirit Box"],
    weaknesses: ["Smudge sticks verblinden hem langer"]
  },
  {
    name: "Deogen",
    evidence: ["Spirit Box", "Ghost Writing", "DOTS Projector"],
    abilities: ["Fast", "Slow"],
    description: "Weet altijd waar spelers zijn. Snel van ver, langzaam dichtbij.",
    bpmRange: { min: 45, max: 75 },
    spmRange: { min: 40, max: 300 },
    tips: ["Verstop je niet - hij weet waar je bent", "Langzaam als hij dichtbij komt"],
    strengths: ["Weet altijd waar alle spelers zijn"],
    weaknesses: ["Beweegt zeer langzaam als hij dichtbij een speler is"]
  },
  {
    name: "Thaye",
    evidence: ["Ghost Orbs", "Ghost Writing", "DOTS Projector"],
    abilities: ["Fast", "Slow", "Hunt Early", "Hunt Late"],
    description: "Veroudert over tijd, wordt langzamer en minder actief.",
    bpmRange: { min: 50, max: 110 },
    spmRange: { min: 60, max: 200 },
    tips: ["Meer actief aan het begin", "Ouija board kan leeftijd onthullen"],
    strengths: ["Zeer actief en snel wanneer hij jong is"],
    weaknesses: ["Wordt langzamer en minder actief naarmate hij ouder wordt"]
  },
];
