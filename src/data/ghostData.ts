export type Evidence = 
  | "EMF Level 5"
  | "Spirit Box"
  | "Ultraviolet"
  | "Ghost Orbs"
  | "Ghost Writing"
  | "Freezing Temps"
  | "DOTS Projector";

// Hunt Sanity Categories:
// - Late Hunt: < 40%
// - Normal Hunt: > 40% (standard 50%)
// - Early Hunt: > 50%
// - Very Early Hunt: > 75%

export type HuntCategory = "Late Hunt" | "Normal Hunt" | "Early Hunt" | "Very Early Hunt";

export type Ability = 
  | "Very Early Hunt"
  | "Early Hunt"
  | "Normal Hunt"
  | "Late Hunt";

export const getHuntCategory = (threshold: number): HuntCategory => {
  if (threshold >= 75) return "Very Early Hunt";
  if (threshold > 50) return "Early Hunt";
  if (threshold >= 40 && threshold <= 50) return "Normal Hunt";
  return "Late Hunt";
};

export const huntCategoryColors: Record<HuntCategory, string> = {
  "Late Hunt": "text-success border-success/50 bg-success/10",
  "Normal Hunt": "text-muted-foreground border-muted-foreground/50 bg-muted/50",
  "Early Hunt": "text-warning border-warning/50 bg-warning/10",
  "Very Early Hunt": "text-destructive border-destructive/50 bg-destructive/10",
};

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
  "Very Early Hunt",
  "Early Hunt",
  "Normal Hunt",
  "Late Hunt",
];

export const speedList: Speed[] = ["Slow", "Normal", "Fast", "LOS Speed up"];
export const visibilityList: VisibilityType[] = ["Invisible", "Normal", "Visible"];

export const ghostDatabase: Ghost[] = [
  {
    name: "Banshee",
    evidence: ["Ultraviolet", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Hunts one specific person at a time. Will often ignore other players.",
    bpmRange: { min: 50, max: 65 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50, condition: "Based on target's sanity only" }],
    tips: ["Focuses on one target until they die", "Use parabolic mic for unique screaming sound"],
    strengths: ["Only focuses on its target during a hunt"],
    weaknesses: ["Crucifix has larger effective range (50% larger)"]
  },
  {
    name: "Dayan",
    evidence: ["EMF Level 5", "Ghost Orbs", "Spirit Box"],
    abilities: ["Early Hunt", "Late Hunt"],
    speed: ["Normal", "Fast", "Slow", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Born from immense cruelty. Hyper-vigilant of movement nearby.",
    bpmRange: { min: 60, max: 90 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 65, condition: "if player is moving nearby" },
      { threshold: 45, condition: "if player is standing still" }
    ],
    tips: ["Stand still to weaken it during a hunt", "Always a female model"],
    strengths: ["Speeds up significantly (2.25 m/s) if you move while close to it"],
    weaknesses: ["Slows down (1.2 m/s) if you stand still while close"]
  },
  {
    name: "Demon",
    evidence: ["Ultraviolet", "Ghost Writing", "Freezing Temps"],
    abilities: ["Very Early Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Hunts very frequently and aggressively.",
    bpmRange: { min: 90, max: 110 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 70 },
      { threshold: 100, condition: "can hunt at any sanity (rare ability)" }
    ],
    smudgeTimer: 60,
    tips: ["Very aggressive - be prepared for hunts", "Can hunt at higher sanity"],
    strengths: ["Hunts more often than other ghosts", "Can hunt at 100% sanity with ability"],
    weaknesses: ["Crucifix range is increased against Demon", "Smudge sticks prevent hunting for only 60s"]
  },
  {
    name: "Deogen",
    evidence: ["Spirit Box", "Ghost Writing", "DOTS Projector"],
    guaranteedEvidence: ["Spirit Box"],
    abilities: ["Late Hunt"],
    speed: ["Slow", "Fast"],
    visibility: ["Normal"],
    description: "Always knows where players are. Fast from far away, very slow up close.",
    bpmRange: { min: 45, max: 75 },
    spmRange: { min: 40, max: 300 },
    huntSanity: [{ threshold: 40 }],
    tips: ["Do not hide - it knows where you are", "Loop it around objects; it is very slow up close"],
    strengths: ["Always knows where all players are", "Fast when chasing from a distance"],
    weaknesses: ["Moves very slowly (0.4m/s) when close to a player"]
  },
  {
    name: "Gallu",
    evidence: ["EMF Level 5", "Ultraviolet", "Spirit Box"],
    abilities: ["Early Hunt", "Normal Hunt", "Late Hunt"],
    speed: ["Normal", "Fast", "Slow", "LOS Speed up"],
    visibility: ["Normal"],
    description: "A reminder that death comes for us all. Protective equipment provokes it.",
    bpmRange: { min: 70, max: 100 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 60, condition: "Enraged state" },
      { threshold: 50, condition: "Normal state" },
      { threshold: 40, condition: "Weakened state" }
    ],
    tips: ["Using crucifix/smudge pushes it to Enraged state", "Cannot step in salt when Enraged"],
    strengths: ["Becomes faster and hunts earlier when Enraged by equipment use"],
    weaknesses: ["Eventually becomes Weakened (slow, late hunt) after being Enraged"]
  },
  {
    name: "Goryo",
    evidence: ["EMF Level 5", "Ultraviolet", "DOTS Projector"],
    guaranteedEvidence: ["DOTS Projector"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "DOTS only visible via video camera when no one is in the room.",
    bpmRange: { min: 70, max: 85 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Watch DOTS via camera from outside the room", "Does not roam far from its favorite room"],
    strengths: ["Only visible via DOTS on camera with no players nearby"],
    weaknesses: ["Cannot wander far from its favorite room"]
  },
  {
    name: "Hantu",
    evidence: ["Ultraviolet", "Ghost Orbs", "Freezing Temps"],
    guaranteedEvidence: ["Freezing Temps"],
    abilities: ["Normal Hunt"],
    speed: ["Fast", "Slow"],
    visibility: ["Normal"],
    description: "Moves faster in cold areas, slower in warm areas. Does not speed up with Line of Sight.",
    bpmRange: { min: 60, max: 90 },
    spmRange: { min: 100, max: 270 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Keep the fuse box on to warm up the house", "Watch for freezing breath during hunts"],
    strengths: ["Moves very fast in colder rooms"],
    weaknesses: ["Moves slow in warmer areas", "Does not accelerate over time during a chase"]
  },
  {
    name: "Jinn",
    evidence: ["EMF Level 5", "Ultraviolet", "Freezing Temps"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up", "Fast"],
    visibility: ["Normal"],
    description: "Moves faster when the target is far away, if the fuse box is on.",
    bpmRange: { min: 85, max: 105 },
    spmRange: { min: 100, max: 250 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Turn off the fuse box to disable its ability", "Can drop sanity of players close to it"],
    strengths: ["Moves faster when the target is far away (if power is on)"],
    weaknesses: ["Cannot use its speed ability when the fuse box is off"]
  },
  {
    name: "Mare",
    evidence: ["Spirit Box", "Ghost Orbs", "Ghost Writing"],
    abilities: ["Early Hunt", "Late Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Hunts more often in the dark. Hates lights.",
    bpmRange: { min: 70, max: 85 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 60, condition: "in darkness" },
      { threshold: 40, condition: "with lights on" }
    ],
    tips: ["Keep lights on to prevent hunts", "It has a chance to immediately turn off a light you turn on"],
    strengths: ["Higher chance to attack in the dark"],
    weaknesses: ["Turning lights on reduces hunt chance"]
  },
  {
    name: "Moroi",
    evidence: ["Spirit Box", "Ghost Writing", "Freezing Temps"],
    guaranteedEvidence: ["Spirit Box"],
    abilities: ["Normal Hunt"],
    speed: ["Slow", "Fast", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Gets faster as average sanity decreases. Curses players via Spirit Box.",
    bpmRange: { min: 85, max: 105 },
    spmRange: { min: 100, max: 220 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Sanity pills are crucial to slow it down", "Hearing it on Spirit Box places a curse that drains sanity"],
    strengths: ["Moves significantly faster at lower sanity", "Curses players causing passive sanity drain"],
    weaknesses: ["Smudge sticks blind/disorient it for longer (7.5s) during hunts"]
  },
  {
    name: "Myling",
    evidence: ["EMF Level 5", "Ultraviolet", "Ghost Writing"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Footsteps are very quiet during hunts.",
    bpmRange: { min: 55, max: 75 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Listen carefully; footsteps only audible when very close", "Produces more paranormal sounds on parabolic mic"],
    strengths: ["Footsteps are much quieter during a hunt"],
    weaknesses: ["Makes paranormal sounds more frequently on parabolic mic"]
  },
  {
    name: "Obake",
    evidence: ["EMF Level 5", "Ultraviolet", "Ghost Orbs"],
    guaranteedEvidence: ["Ultraviolet"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Can shapeshift during hunts. Has a chance to leave 6-finger fingerprints.",
    bpmRange: { min: 65, max: 80 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Look for 6-finger handprints", "Watch for shapeshifting (blinking into different model) during hunt"],
    strengths: ["Can shapeshift to confuse players", "Chance to hide fingerprints completely"],
    weaknesses: ["Sometimes leaves unique 6-finger fingerprints"]
  },
  {
    name: "Obambo",
    evidence: ["Ghost Writing", "Ultraviolet", "DOTS Projector"],
    abilities: ["Early Hunt", "Late Hunt"],
    speed: ["Normal", "Fast", "Slow", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Flickers between states of Calm and Aggression (every 2 mins).",
    bpmRange: { min: 60, max: 90 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 65, condition: "Aggressive state" },
      { threshold: 10, condition: "Calm state" }
    ],
    tips: ["Track its mood - frequent hunts mean Aggressive state", "Very passive during Calm state"],
    strengths: ["Aggressive state has high hunt threshold (65%) and faster speed"],
    weaknesses: ["Calm state has very low hunt threshold (10%) and slower speed"]
  },
  {
    name: "Oni",
    evidence: ["EMF Level 5", "Freezing Temps", "DOTS Projector"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Visible"],
    description: "Very active and visible. Cannot do the 'ghost mist' event.",
    bpmRange: { min: 95, max: 115 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["More active with people nearby", "Visible for longer periods during hunts (blinks less)"],
    strengths: ["More active with more players nearby", "Drains sanity faster via contact events"],
    weaknesses: ["Highly visible during hunts, making it easier to loop and identify"]
  },
  {
    name: "Onryo",
    evidence: ["Spirit Box", "Ghost Orbs", "Freezing Temps"],
    abilities: ["Very Early Hunt", "Early Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Fears fire. Extinguishing a flame can cause it to hunt.",
    bpmRange: { min: 80, max: 95 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 60 },
      { threshold: 100, condition: "when flame is blown out (after 3rd blowout)" }
    ],
    tips: ["Candles act like crucifixes", "Will hunt if it blows out a candle and no other flame/crucifix is near"],
    strengths: ["Extinguished flame can trigger a hunt at any sanity"],
    weaknesses: ["Flames prevent it from hunting (priority over crucifix)"]
  },
  {
    name: "Phantom",
    evidence: ["Spirit Box", "Ultraviolet", "DOTS Projector"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Invisible"],
    description: "Disappears when photographed. Looking at it drains sanity fast.",
    bpmRange: { min: 65, max: 75 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Take a photo during an event to make it vanish", "Blinks very slowly during hunts (invisible for longer)"],
    strengths: ["Looking at a Phantom significantly drains sanity"],
    weaknesses: ["Taking a photo causes it to temporarily disappear (no ghost photo in journal if it vanished)"]
  },
  {
    name: "Poltergeist",
    evidence: ["Spirit Box", "Ultraviolet", "Ghost Writing"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Throws multiple objects at once. Loves to mess with items.",
    bpmRange: { min: 80, max: 100 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Watch for 'item explosions'", "Can decrease player sanity by throwing items"],
    strengths: ["Can throw many objects at once", "Throws objects with great force"],
    weaknesses: ["Ineffective in empty rooms with no throwables"]
  },
  {
    name: "Raiju",
    evidence: ["EMF Level 5", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Early Hunt", "Normal Hunt"],
    speed: ["Normal", "Fast", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Moves faster near active electronic equipment.",
    bpmRange: { min: 100, max: 120 },
    spmRange: { min: 100, max: 250 },
    huntSanity: [
      { threshold: 50, condition: "normally" },
      { threshold: 65, condition: "near electronics" }
    ],
    tips: ["Turn off electronics during hunts", "Watch out for early hunts if equipment is left on"],
    strengths: ["Moves very fast near active electronic equipment"],
    weaknesses: ["Disrupts electronics from further away, revealing its position"]
  },
  {
    name: "Revenant",
    evidence: ["Ghost Orbs", "Ghost Writing", "Freezing Temps"],
    abilities: ["Normal Hunt"],
    speed: ["Fast", "Slow"],
    visibility: ["Normal"],
    description: "Very slow when it doesn't sense a player, extremely fast when it does.",
    bpmRange: { min: 40, max: 60 },
    spmRange: { min: 50, max: 300 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Hide immediately - do not run in straight lines", "Slows down massively if it loses line of sight"],
    strengths: ["Moves extremely fast when it detects a player"],
    weaknesses: ["Moves very slowly when it has no target"]
  },
  {
    name: "Shade",
    evidence: ["EMF Level 5", "Ghost Writing", "Freezing Temps"],
    abilities: ["Late Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "A shy ghost. Hard to find evidence.",
    bpmRange: { min: 55, max: 70 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 35 }],
    tips: ["Stay alone in the room to get evidence", "Will not hunt if multiple people are in the same room"],
    strengths: ["Harder to find evidence when grouped up"],
    weaknesses: ["Will not hunt if multiple players are nearby"]
  },
  {
    name: "Spirit",
    evidence: ["EMF Level 5", "Spirit Box", "Ghost Writing"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "A common ghost. No unique strengths, but hates smudge sticks.",
    bpmRange: { min: 60, max: 80 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    smudgeTimer: 180,
    tips: ["Use incense to repel the ghost for a long time", "If it hunts within 180s of smudging, it's not a Spirit"],
    strengths: ["None"],
    weaknesses: ["Incense prevents hunting for 180 seconds (double the normal time)"]
  },
  {
    name: "Thaye",
    evidence: ["Ghost Orbs", "Ghost Writing", "DOTS Projector"],
    abilities: ["Very Early Hunt", "Late Hunt"],
    speed: ["Slow", "Fast"],
    visibility: ["Normal"],
    description: "Ages over time. Fast and active when young, slow and quiet when old.",
    bpmRange: { min: 50, max: 110 },
    spmRange: { min: 60, max: 200 },
    huntSanity: [
      { threshold: 75, condition: "when young" },
      { threshold: 15, condition: "when old" }
    ],
    tips: ["Rush evidence early", "Does not speed up with Line of Sight"],
    strengths: ["Very active and fast when entering the map (Young)"],
    weaknesses: ["Becomes slower and less active as time passes (Old)"]
  },
  {
    name: "The Mimic",
    evidence: ["Spirit Box", "Ultraviolet", "Freezing Temps", "Ghost Orbs"],
    guaranteedEvidence: ["Ghost Orbs"],
    abilities: ["Very Early Hunt", "Early Hunt", "Normal Hunt", "Late Hunt"],
    speed: ["Fast", "Slow", "Normal", "LOS Speed up"],
    visibility: ["Invisible", "Normal", "Visible"],
    description: "Can mimic other ghost behaviors and traits. Always shows Ghost Orbs as fake evidence.",
    bpmRange: { min: 40, max: 120 },
    spmRange: { min: 50, max: 300 },
    huntSanity: [{ threshold: 50, condition: "varies based on mimicked ghost" }],
    tips: ["Check for a 4th evidence (Orbs are fake)", "Behavior changes unpredictably"],
    strengths: ["Can mimic the abilities and traits of any other ghost"],
    weaknesses: ["Always presents Ghost Orbs as a distraction (fake evidence)"]
  },
  {
    name: "The Twins",
    evidence: ["EMF Level 5", "Spirit Box", "Freezing Temps"],
    abilities: ["Normal Hunt"],
    speed: ["Fast", "Slow", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Consists of a main ghost and a decoy. Can interact in two places.",
    bpmRange: { min: 50, max: 100 },
    spmRange: { min: 100, max: 190 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Watch for simultaneous interactions", "Decoy is faster during hunts, Main is slower"],
    strengths: ["Either Twin can start a hunt (Main or Decoy)"],
    weaknesses: ["Often interact with the environment at the same time"]
  },
  {
    name: "Wraith",
    evidence: ["EMF Level 5", "Spirit Box", "DOTS Projector"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Floats, never leaves footprints in salt. Can teleport to players.",
    bpmRange: { min: 75, max: 90 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Check salt: if disturbed but no footprints, it's a Wraith", "Randomly teleports to players"],
    strengths: ["Never leaves footprints after stepping in salt", "Can teleport to random players"],
    weaknesses: ["Touching salt makes it very active (but no footprints)"]
  },
  {
    name: "Yokai",
    evidence: ["Spirit Box", "Ghost Orbs", "DOTS Projector"],
    abilities: ["Very Early Hunt", "Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Attracted to human voices. Hearing is bad during hunts.",
    bpmRange: { min: 75, max: 90 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [
      { threshold: 50, condition: "normally" },
      { threshold: 80, condition: "when talking nearby" }
    ],
    tips: ["Shut up during hunts", "Talking near it can trigger a hunt at 80% sanity"],
    strengths: ["Talking nearby makes it more aggressive"],
    weaknesses: ["Can only hear players within 2.5 meters during a hunt"]
  },
  {
    name: "Yurei",
    evidence: ["Ghost Orbs", "Freezing Temps", "DOTS Projector"],
    abilities: ["Normal Hunt"],
    speed: ["Normal", "LOS Speed up"],
    visibility: ["Normal"],
    description: "Drains sanity faster. Can be trapped in a room with smudge.",
    bpmRange: { min: 65, max: 80 },
    spmRange: { min: 100, max: 170 },
    huntSanity: [{ threshold: 50 }],
    tips: ["Smudging stops it from wandering", "Can slam doors shut completely causing sanity drop"],
    strengths: ["Stronger effect on player sanity"],
    weaknesses: ["Smudging its room prevents it from wandering for 90 seconds"]
  }
];