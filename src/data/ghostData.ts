export type Evidence = 
  | "EMF Level 5"
  | "Spirit Box"
  | "Ultraviolet"
  | "Ghost Orbs"
  | "Ghost Writing"
  | "Freezing Temps"
  | "DOTS Projector";

export type Ability = 
  | "Hunt Early"
  | "Hunt Late";

export type Speed = "Fast" | "Normal" | "Slow" | "LOS Speed up";
export type VisibilityType = "Invisible" | "Normal" | "Visible";

export type EvidenceState = "unknown" | "present" | "excluded";

export interface HuntSanityCondition {
  threshold: number;
  condition?: string; // e.g., "when talking nearby", "in darkness"
}

export interface Ghost {
  name: string;
  evidence: Evidence[];
  guaranteedEvidence?: Evidence[]; // Evidence that ALWAYS shows for this ghost
  abilities: Ability[];
  speed: Speed[];
  visibility: VisibilityType[];
  description: string;
  bpmRange?: { min: number; max: number };
  spmRange?: { min: number; max: number };
  huntSanity?: HuntSanityCondition[];
  smudgeTimer?: number; // seconds before ghost can hunt after smudge
  tips?: string[];
  strengths?: string[];
  weaknesses?: string[];
}

export const evidenceList: Evidence[] = [
  "EMF Level 5",
  "Spirit Box",
  "Ultraviolet",
  "Ghost Orbs",
  "Ghost Writing",
  "Freezing Temps",
  "DOTS Projector",
];

export const abilityList: Ability[] = [
  "Hunt Early",
  "Hunt Late",
];

export const speedList: Speed[] = ["Slow", "Normal", "Fast", "LOS Speed up"];
export const visibilityList: VisibilityType[] = ["Invisible", "Normal", "Visible"];

export const ghostDatabase: Ghost[] = [
  {
    name: "Banshee",
    evidence: ["Ultraviolet", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Hunts one specific person at a time.",
    bpmRange: { min: 50, max: 65 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50, condition: "Based on target's sanity only" }],
    tips: ["Focuses on one target until they die", "Use parabolic mic for unique sound"],
    strengths: ["Only focuses on its target during a hunt"],
    weaknesses: ["Crucifix has larger effective range"]
  },
  {
    name: "Dayan",
    evidence: ["EMF Level 5", "Ghost Orbs", "Spirit Box"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "The Dayan is born from the soul of someone who suffered immense cruelty in life. Now, in death, she is hyper-vigilant of anyone who 'dances' too close.",
    bpmRange: { min: 60, max: 90 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Stand still near the ghost to weaken it", "Moving/dancing near it makes it stronger"],
    strengths: ["The Dayan gains strength to protect herself if people 'dance' too close to her"],
    weaknesses: ["The Dayan loses strength if people close to her stand still"]
  },
  {
    name: "Demon",
    evidence: ["Ultraviolet", "Ghost Writing", "Freezing Temps"],
    abilities: ["Hunt Early"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Hunts very frequently and aggressively.",
    bpmRange: { min: 90, max: 110 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 70 },
      { threshold: 100, condition: "can hunt at any sanity (rare)" }
    ],
    smudgeTimer: 60,
    tips: ["Very aggressive - be prepared for hunts", "Can hunt at higher sanity"],
    strengths: ["Hunts more often than other ghosts", "Can hunt at higher sanity"],
    weaknesses: ["Ouija board questions cost less sanity", "Short smudge timer (60s)"]
  },
  {
    name: "Deogen",
    evidence: ["Spirit Box", "Ghost Writing", "DOTS Projector"],
    guaranteedEvidence: ["Spirit Box"],
    abilities: [],
    speed: ["Slow", "Fast"],
    visibility: ["Normal"],
    description: "Always knows where players are. Fast from far, slow up close.",
    bpmRange: { min: 45, max: 75 },
    spmRange: { min: 40, max: 300 },
    huntSanity: [{ threshold: 40 }],
    tips: ["Do not hide - it knows where you are", "Slow when it gets close"],
    strengths: ["Always knows where all players are"],
    weaknesses: ["Moves very slowly when close to a player"]
  },
  {
    name: "Gallu",
    evidence: ["EMF Level 5", "Ultraviolet", "Spirit Box"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Another form of demon, the Gallu is a reminder that death comes for us all. Using protective equipment provokes the ghost until it's no longer effective.",
    bpmRange: { min: 70, max: 100 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Avoid using protective equipment repeatedly", "Let the ghost calm down before using protection again"],
    strengths: ["Using protective equipment pushes the ghost to become enraged, weakening equipment effects"],
    weaknesses: ["Being enraged exhausts the Gallu, making protective equipment more effective"]
  },
  {
    name: "Goryo",
    evidence: ["EMF Level 5", "Ultraviolet", "DOTS Projector"],
    guaranteedEvidence: ["DOTS Projector"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "DOTS only visible via camera, not with the naked eye.",
    bpmRange: { min: 70, max: 85 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["DOTS must be viewed via video camera", "Rarely leaves its favorite room"],
    strengths: ["Only visible via DOTS on camera"],
    weaknesses: ["Rarely appears far from its favorite room"]
  },
  {
    name: "Hantu",
    evidence: ["Ultraviolet", "Ghost Orbs", "Freezing Temps"],
    guaranteedEvidence: ["Freezing Temps"],
    abilities: [],
    speed: ["Fast", "Slow"],
    visibility: ["Normal"],
    description: "Moves faster in cold rooms.",
    bpmRange: { min: 60, max: 90 },
    spmRange: { min: 100, max: 270 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Keep the fuse box on for warmth", "Watch for freezing breath"],
    strengths: ["Moves faster in colder areas"],
    weaknesses: ["Moves slower in warmer areas"]
  },
  {
    name: "Jinn",
    evidence: ["EMF Level 5", "Ultraviolet", "Freezing Temps"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Moves faster when the target is far away.",
    bpmRange: { min: 85, max: 105 },
    spmRange: { min: 100, max: 250 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Turn off the fuse box to slow it down", "Faster at distance"],
    strengths: ["Moves faster when the target is far away"],
    weaknesses: ["Cannot use its ability when power is off"]
  },
  {
    name: "Mare",
    evidence: ["Spirit Box", "Ghost Orbs", "Ghost Writing"],
    abilities: ["Hunt Early"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Hunts more often in the dark.",
    bpmRange: { min: 70, max: 85 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 60, condition: "in darkness" },
      { threshold: 40, condition: "with lights on" }
    ],
    tips: ["Keep lights on to prevent hunts", "Often turns lights off"],
    strengths: ["Higher chance to attack in the dark"],
    weaknesses: ["Keep lights on to reduce hunts"]
  },
  {
    name: "Moroi",
    evidence: ["Spirit Box", "Ghost Writing", "Freezing Temps"],
    guaranteedEvidence: ["Spirit Box"],
    abilities: [],
    speed: ["Slow", "Fast", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Gets faster as sanity decreases.",
    bpmRange: { min: 85, max: 105 },
    spmRange: { min: 100, max: 220 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Sanity pills are crucial", "Spirit Box can curse you"],
    strengths: ["Moves faster at lower sanity", "Can curse players via Spirit Box"],
    weaknesses: ["Smudge sticks blind it longer"]
  },
  {
    name: "Myling",
    evidence: ["EMF Level 5", "Ultraviolet", "Ghost Writing"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Makes less noise during hunts.",
    bpmRange: { min: 55, max: 75 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Listen for footsteps - very quiet during hunts", "Parabolic mic for sounds"],
    strengths: ["Makes less noise during hunts"],
    weaknesses: ["Makes more sounds via parabolic mic"]
  },
  {
    name: "Obake",
    evidence: ["EMF Level 5", "Ultraviolet", "Ghost Orbs"],
    guaranteedEvidence: ["Ultraviolet"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Can leave 6-finger fingerprints.",
    bpmRange: { min: 65, max: 80 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Look for 6-finger prints", "Fingerprints disappear faster"],
    strengths: ["Can shapeshift making evidence less visible"],
    weaknesses: ["Sometimes leaves unique 6-finger prints"]
  },
  {
    name: "Obambo",
    evidence: ["Ghost Writing", "Ultraviolet", "DOTS Projector"],
    abilities: ["Hunt Early", "Hunt Late"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "The Obambo is the ghost of someone never properly laid to rest. Fickle and defensive, it flickers between states of calm and aggression.",
    bpmRange: { min: 60, max: 90 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 60, condition: "while aggressive" },
      { threshold: 40, condition: "while calm" }
    ],
    tips: ["Track its mood - aggressive vs calm changes its behavior", "Easier to track when calm"],
    strengths: ["While aggressive, the Obambo is quicker to start hunting"],
    weaknesses: ["While calm, the Obambo is slower to start hunting and easier to track"]
  },
  {
    name: "Oni",
    evidence: ["EMF Level 5", "Freezing Temps", "DOTS Projector"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Visible"],
    description: "Very active and visible when players are nearby.",
    bpmRange: { min: 95, max: 115 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["More active with more people in the room", "More visible during hunts"],
    strengths: ["More active with more players nearby", "Throws objects with more force"],
    weaknesses: ["Higher activity makes identification easier"]
  },
  {
    name: "Onryo",
    evidence: ["Spirit Box", "Ghost Orbs", "Freezing Temps"],
    abilities: ["Hunt Early"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Triggered by extinguishing flames.",
    bpmRange: { min: 80, max: 95 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 60 },
      { threshold: 100, condition: "when flame is blown out" }
    ],
    tips: ["Candles can prevent hunts", "Extinguishing flames triggers hunts"],
    strengths: ["Extinguished flame can trigger a hunt"],
    weaknesses: ["Flames prevent it from hunting"]
  },
  {
    name: "Phantom",
    evidence: ["Spirit Box", "Ultraviolet", "DOTS Projector"],
    abilities: ["Hunt Early"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Invisible"],
    description: "Temporarily disappears when photographed.",
    bpmRange: { min: 65, max: 75 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Take a photo to make the ghost disappear", "Looking at Phantom drains sanity faster"],
    strengths: ["Looking at a Phantom significantly drains sanity"],
    weaknesses: ["Taking a photo causes it to temporarily disappear"]
  },
  {
    name: "Poltergeist",
    evidence: ["Spirit Box", "Ultraviolet", "Ghost Writing"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Throws many objects at once.",
    bpmRange: { min: 80, max: 100 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Watch for many moving objects at once", "Can throw multiple items simultaneously"],
    strengths: ["Can throw many objects at once", "More effective in rooms with many items"],
    weaknesses: ["Almost ineffective in empty rooms"]
  },
  {
    name: "Raiju",
    evidence: ["EMF Level 5", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    speed: ["Normal", "Fast", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Moves faster near electronic equipment.",
    bpmRange: { min: 100, max: 120 },
    spmRange: { min: 100, max: 250 },
    huntSanity: [
      { threshold: 50, condition: "normally" },
      { threshold: 65, condition: "near electronics" }
    ],
    tips: ["Turn off electronics during hunts", "Faster near active equipment"],
    strengths: ["Moves faster near electronic equipment"],
    weaknesses: ["Disrupts electronics more often making it easier to find"]
  },
  {
    name: "Revenant",
    evidence: ["Ghost Orbs", "Ghost Writing", "Freezing Temps"],
    abilities: [],
    speed: ["Fast", "Slow"],
    visibility: ["Normal"],
    description: "Very slow until it sees a player, then extremely fast.",
    bpmRange: { min: 40, max: 60 },
    spmRange: { min: 50, max: 300 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Hide if it cannot see you", "Extremely fast when it sees you"],
    strengths: ["Moves extremely fast when chasing a target"],
    weaknesses: ["Moves very slowly when it has no target"]
  },
  {
    name: "Shade",
    evidence: ["EMF Level 5", "Ghost Writing", "Freezing Temps"],
    abilities: ["Hunt Late"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Avoids interaction when multiple players are nearby.",
    bpmRange: { min: 55, max: 70 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 35 }],
    tips: ["Stay alone for more activity", "Very shy with multiple players"],
    strengths: ["Less active with multiple players nearby"],
    weaknesses: ["Will not hunt when multiple players are nearby"]
  },
  {
    name: "Spirit",
    evidence: ["EMF Level 5", "Spirit Box", "Ghost Writing"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "A common ghost with no special abilities.",
    bpmRange: { min: 60, max: 80 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    smudgeTimer: 180,
    tips: ["Use incense to repel the ghost", "Effective with smudging"],
    strengths: ["No special powers"],
    weaknesses: ["Incense is extra effective and prevents hunting for longer (180s)"]
  },
  {
    name: "Thaye",
    evidence: ["Ghost Orbs", "Ghost Writing", "DOTS Projector"],
    abilities: ["Hunt Early", "Hunt Late"],
    speed: ["Slow", "Fast"],
    visibility: ["Normal"],
    description: "Ages over time, becoming slower and less active.",
    bpmRange: { min: 50, max: 110 },
    spmRange: { min: 60, max: 200 },
    huntSanity: [
      { threshold: 75, condition: "when young" },
      { threshold: 15, condition: "when old" }
    ],
    tips: ["More active at the beginning", "Ouija board can reveal age"],
    strengths: ["Very active and fast when young"],
    weaknesses: ["Becomes slower and less active as it ages"]
  },
  {
    name: "The Mimic",
    evidence: ["Spirit Box", "Ultraviolet", "Freezing Temps", "Ghost Orbs"],
    guaranteedEvidence: ["Ghost Orbs"],
    abilities: [],
    speed: ["Fast", "Slow", "Normal", "LOS Speed up"],
    visibility: ["Invisible", "Normal", "Visible"],
    description: "Can mimic other ghost behaviors. Always gives Ghost Orbs.",
    bpmRange: { min: 40, max: 120 },
    spmRange: { min: 50, max: 300 },
    huntSanity: [{ threshold: 50, condition: "varies based on mimicked ghost" }],
    tips: ["Ghost Orbs are extra evidence (not primary)", "Copies behavior of other ghosts"],
    strengths: ["Can mimic the behavior of any other ghost"],
    weaknesses: ["Always gives Ghost Orbs as extra evidence"]
  },
  {
    name: "The Twins",
    evidence: ["EMF Level 5", "Spirit Box", "Freezing Temps"],
    abilities: [],
    speed: ["Fast", "Slow", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Can perform two interactions in different locations.",
    bpmRange: { min: 50, max: 100 },
    spmRange: { min: 100, max: 190 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Watch for simultaneous interactions in different places", "One twin is faster than the other"],
    strengths: ["Can interact in multiple locations at once"],
    weaknesses: ["Often interact at the same time"]
  },
  {
    name: "Wraith",
    evidence: ["EMF Level 5", "Spirit Box", "DOTS Projector"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Can move through walls and leaves no footprints.",
    bpmRange: { min: 75, max: 90 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Check salt traces - Wraith leaves no footprints in salt", "Can teleport to players"],
    strengths: ["Never leaves footprints", "Can teleport through doors and walls"],
    weaknesses: ["Is damaged by touching salt"]
  },
  {
    name: "Yokai",
    evidence: ["Spirit Box", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Hunt Early"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Triggered by voices nearby.",
    bpmRange: { min: 75, max: 90 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 50, condition: "normally" },
      { threshold: 80, condition: "when talking nearby" }
    ],
    tips: ["Be quiet near the ghost", "Talking triggers hunts"],
    strengths: ["Talking nearby makes it more aggressive"],
    weaknesses: ["Can only hear players who are close during a hunt"]
  },
  {
    name: "Yurei",
    evidence: ["Ghost Orbs", "Freezing Temps", "DOTS Projector"],
    abilities: [],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Affects sanity more strongly than other ghosts.",
    bpmRange: { min: 65, max: 80 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Smudging in the room limits movement", "Drains sanity faster"],
    strengths: ["Stronger effect on player sanity"],
    weaknesses: ["Smudging in its room limits its movement"]
  },
];
