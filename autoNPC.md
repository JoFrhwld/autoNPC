---
noteType: pf2eMonster
aliases: "Ditto"
tags: 
  - pf2e/creature/level/1
statblock: inline
name: "Sample Creature"
level: 1
#challenge_level: "high"
#perception: 6
#size: "small"
#alignment: "CN"
return: "statblock"
traits:
  - "[[humanoid|Humanoid]]"
#saves:
#  fortitude: 0
#  reflex: 0
#  will: 0
#speed: 20
#ability:
#  str: 4
#  dex: 4
#  con: 3
#  int: 4
#  wis: 4
#  cha: 3
abilities_top:
  - name: Items
    desc: "leather armor;"
#abilities_mid:
#abilities_bot:
#skills: 
#spellcasting
attacks:
  - name: Melee
    desc:  "⬻ fist +6 ([[agile]], [[nonlethal]]); __Damage__ 1d4 (1d4) bludgeoning"
  - name: Improvised Weapon
    desc: "⬻ improvised +2; __Damage__ 1d6 (1d6)"
---

```dataviewjs
// To be included in a dataviewjs block

const this_front = dv.current().file.frontmatter
if (!("level" in this_front)){
  this_front["level"] = 0;
}

const ability_order = ["str", "dex", "con", "int", "wis", "cha"];

// based on Table 2-1
// Pathfinder 2e Game Mastery Guide
// Release Date 2/26/2020
const ability_dict = {
  "-1": 2,
  "0": 2,
  "1": 3,
  "2": 3,
  "3": 3,
  "4": 3,
  "5": 4,
  "6": 4,
  "7": 4,
  "8": 4,
  "9": 4,
  "10": 4,
  "11": 5,
  "12": 5,
  "13": 5,
  "14": 5,
  "15": 6,
  "16": 6,
  "17": 6,
  "18": 6,
  "19": 6,
  "20": 7,
  "21": 7,
  "22": 8,
  "23": 8,
  "24": 9
};

// based on Table 2-2
// Pathfinder 2e Game Mastery Guide
// Release Date 2/26/2020
const percep_dict = {
  "-1": 5,
  "0": 6,
  "1": 7,
  "2": 8,
  "3": 9,
  "4": 11,
  "5": 12,
  "6": 14,
  "7": 15,
  "8": 16,
  "9": 18,
  "10": 19,
  "11": 21,
  "12": 22,
  "13": 23,
  "14": 25,
  "15": 26,
  "16": 28,
  "17": 29,
  "18": 30,
  "19": 32,
  "20": 33,
  "21": 35,
  "22": 36,
  "23": 37,
  "24": 38
};

// based on Table 2-5
// Pathfinder 2e Game Mastery Guide
// Release Date 2/26/2020
const ac_dict = {
  "-1": 14,
  "0": 15,
  "1": 15,
  "2": 17,
  "3": 18,
  "4": 20,
  "5": 21,
  "6": 23,
  "7": 24,
  "8": 26,
  "9": 27,
  "10": 29,
  "11": 30,
  "12": 32,
  "13": 33,
  "14": 35,
  "15": 36,
  "16": 38,
  "17": 39,
  "18": 41,
  "19": 42,
  "20": 44,
  "21": 45,
  "22": 47,
  "23": 48,
  "24": 50 
};

// based on Table 2-6
// Pathfinder 2e Game Mastery Guide
// Release Date 2/26/2020
const saves_dict = {
  "-1": 5,
  "0": 6,
  "1": 7,
  "2": 8,
  "3": 9,
  "4": 11,
  "5": 12,
  "6": 14,
  "7": 15,
  "8": 16,
  "9": 18,
  "10": 19,
  "11": 21,
  "12": 22,
  "13": 23,
  "14": 25,
  "15": 26,
  "16": 28,
  "17": 28,
  "18": 30,
  "19": 32,
  "20": 33,
  "21": 35,
  "22": 36,
  "23": 27,
  "24": 38 
}

// based on Table 2-7
// Pathfinder 2e Game Mastery Guide
// Release Date 2/26/2020
const hp_dict = {
  "-1": median([5,6]),
  "0": median([11,13]),
  "1": median([14,16]),
  "2": median([25, 21]),
  "3": median([37-31]),
  "4": median([48,42]),
  "5": median([59,53]),
  "6": median([75,67]),
  "7": median([90,82]),
  "8": median([105,97]),
  "9": median([120,112]),
  "10": median([135,127]),
  "11": median([150,142]),
  "12": median([165,157]),
  "13": median([180, 172]),
  "14": median([195, 187]),
  "15": median([210, 202]),
  "16": median([225, 217]),
  "17": median([240, 232]),
  "18": median([255, 247]),
  "19": median([270, 262]),
  "20": median([285, 277]),
  "21": median([305, 295]),
  "22": median([329, 317]),
  "23": median([351, 339]),
  "24": median([385, 367]) 
};

function median(values){
  if(values.length ===0) throw new Error("No inputs");

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);
  
  if (values.length % 2)
    return values[half];
  
  return (values[half - 1] + values[half]) / 2.0;
}

// adjust default values given the challenge level
function adjust_for_challenge(value, challenge_dict){
  let new_value = value
  if (this_front.challenge_level in challenge_dict){
    new_value = value + challenge_dict[this_front.challenge_level];
  }
  return new_value;
}

function block_to_yaml(block){
  let block_list = [];
  for (let idx in block){
    let item = block[idx];
    let these_keys = Object.keys(item);
    for (let i = 0; i < these_keys.length; i++){
       let item_line = "    ";
       if (i===0){
        item_line = "  - ";
       }
       let final_line = `${item_line}${these_keys[i]}: ${item[these_keys[i]]}`
       block_list.push(final_line)
    }
  }
  return block_list.join("\n");
}

// Returns the final statblock
function wholestat(){
  let blockhead = "```";

  if ("return" in this_front){
    if (this_front.return === "statblock"){
      blockhead = "```statblock";
    }
  }
  
  return [
    blockhead,
    statcontents(),
    "```"
  ].join("\n")
}


// Builds the top info block
function makeinfoblock(){
  // default formatting
  let infoarray = [
    "columns: 2",
    "forcecolumns: 2",
    "layout: Path2eBlock",
    "statblock: true"
  ]
  
  // name of ceature
  if (this_front.name){
    infoarray.push(`name: "${this_front.name}"`)
  }else{
    infoarray.push('name: "Unnamed"')
  }
  
  // level of creature
  if ("level" in this_front){
      infoarray.push(
      `level: "Creature ${this_front.level}"`
      )
  } else {
    infoarray.push('level: "Creature"')
  }

  // alignment of creature
  if (this_front.alignment) {
    infoarray.push(
      `alignment: "${this_front.alignment}"`
      )
  } else {
	infoarray.push('alignment: "N"')
  }
  
  // size of creature
  if (this_front.size) {
    infoarray.push(
      `size: "${this_front.size}"`
      )
  } else {
 	infoarray.push('size: "Medium"')
  }

  // speed of creature 
  if (this_front.speed) {
    infoarray.push(`speed: ${this_front.speed}`)
  }else{ 
    infoarray.push("speed: 25")
  }
  
  return infoarray.join("\n")
}

function buildTraits(){
 let traitlist = [];
 let traitcount = 2;
 if (this_front.traits){
   for (let i = 0; i < this_front.traits.length; i++){
     traitcount++;
     let trait_label = `trait_0${traitcount.toString()}`;
     traitlist.push(
      `${trait_label}: ${this_front.traits[i]}`
     )
   }
 }
 return traitlist.join("\n")
}

// Builds perception
function buildPercep(){
  let percep_value = percep_dict[this_front.level.toString()];

  const percep_level_mod = {
    "low": -3,
    "high": 3
  };
  
  if (this_front.challenge_level){
    percep_value = adjust_for_challenge(percep_value, percep_level_mod);
  }

  if ("perception" in  this_front){
    percep_value = this_front.perception;
  }
  return percep_value
}

function buildPercepBlock(percep_value){
  let percep_list = []
  percep_list.push(
    `modifier: "${percep_value}"`
  );
  percep_list.push(
    "perception: "
  )
  percep_list.push(
    "  - name: Perception"
  )
  let sign = "+";
  if (percep_value < 0){
    sign = "";
  }  
  percep_list.push(
    `    desc: "Perception ${sign}${percep_value}"`
  )
 
  return percep_list.join("\n")
}

function buildAC(){
  let ac_info_dict = {
    "ac": ac_dict[this_front.level.toString()],
    "fortitude": saves_dict[this_front.level.toString()],
    "reflex": saves_dict[this_front.level.toString()],
    "will": saves_dict[this_front.level.toString()]
  }
  
  const ac_level_mod = {
    "low": -2,
    "high": 1
  };

  const save_level_mod = {
    "low": -3,
    "high": 3
  }

  /// AC setting
  if (this_front.challenge_level){
    ac_info_dict.ac = adjust_for_challenge(ac_info_dict.ac, ac_level_mod);
  }
  // Override ac if in header
  if ("ac" in  this_front){
    ac_info_dict.ac = this_front.ac;
  }

  // saves setting 
  if (this_front.challenge_level){
    ac_info_dict.fortitude = adjust_for_challenge(ac_info_dict.fortitude, save_level_mod);
    ac_info_dict.will= adjust_for_challenge(ac_info_dict.will, save_level_mod);
    ac_info_dict.reflex = adjust_for_challenge(ac_info_dict.reflex, save_level_mod);
  }
  // saves overides
  if ("saves" in this_front){
    for (const [save, value] of Object.entries(this_front.saves)){
      ac_info_dict[save] = value;
    }
  } 
  return ac_info_dict;
}

function buildACBlock(ac_info_dict){
  let ac_list = [];
  ac_list.push(`ac: ${ac_info_dict.ac}`);
  ac_list.push("armorclass:");
  ac_list.push("  - name: AC")
  ac_list.push(`    desc: "${ac_info_dict.ac}; ` + 
               `__Fort__: +${ac_info_dict.fortitude} (1d20+${ac_info_dict.fortitude}); `+
               `__Ref__: +${ac_info_dict.reflex} (1d20+${ac_info_dict.reflex}); `+
               `__Will__: +${ac_info_dict.will} (1d20+${ac_info_dict.will});"`)
  return ac_list.join("\n")
}

function build_ability(){
  let this_ability_dict = {
    "str": ability_dict[this_front.level.toString()],
    "dex": ability_dict[this_front.level.toString()],
    "con": ability_dict[this_front.level.toString()],
    "int": ability_dict[this_front.level.toString()],
    "wis": ability_dict[this_front.level.toString()],
    "cha": ability_dict[this_front.level.toString()]
  }

  if ("ability" in this_front){
    for (let i = 0; i < ability_order.length; i++){
      if (ability_order[i] in this_front.ability){
        this_ability_dict[ability_order[i]] = this_front.ability[ability_order [i]];
      }
    }
  }
  let ability_string = "abilityMods: ["
  for (let i = 0; i < ability_order.length; i++){
    ability_string += `${this_ability_dict[ability_order[i]]},`;
  }
  ability_string += "]"
  return ability_string;
}

function buildHP(){
  let hp_value = hp_dict[this_front.level.toString()]
  if ("hp" in this_front){
    hp_value = this_front.hp;
  }
  return hp_value
}

function buildHPEntry(hp_value){
  let hp_list = []
  hp_list.push(`hp: ${hp_value}`);
  hp_list.push("health:")
  hp_list.push("  - name: HP")
  hp_list.push(`    desc: "${hp_value};"`)
  return hp_list.join("\n")
}

const build_blocks = [
    "abilities_top",
    "abilities_mid",
    "abilities_bot",
    "attacks",
    "skills",
    "spellcasting"
]

function buildABlock(block_name){
  let block_list = [];
  if (block_name in this_front){
    block_list.push(`${block_name}:`);
    block_list.push(
        block_to_yaml(this_front[block_name])
    );
  }
  return block_list.join("\n")
}

function buildAllBlocks(blocks){
  let all_blocks = [];
  for (let idx in blocks){
    all_blocks.push(buildABlock(blocks[idx]));
  }
  return all_blocks.join("\n");
}

// global values
var percep_value = buildPercep();
var ac_info_dict = buildAC();
var hp_value = buildHP();


// Builds components of a stat block
function statcontents(){
  return [
   makeinfoblock(),
   build_ability(),
   buildHPEntry(hp_value),
   buildTraits(),
   buildPercepBlock(percep_value),
   buildACBlock(ac_info_dict),
   buildAllBlocks(build_blocks)
  ].join("\n")
}

/////

// Build encounter table

function encountertable(){
  let tbl_list = [
    "```encounter-table",
    `name: ${this_front.name}`,
    "creatures:",
    `  - ${this_front.name}, ${hp_value}, ${ac_info_dict.ac}, ${percep_value}`,
    "```"
  ];
  return tbl_list.join("\n")
}

dv.paragraph(wholestat())
dv.paragraph(encountertable())
```

