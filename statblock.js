// To be included in a dataviewjs block
const this_front = dv.current().file.frontmatter

if (!("level" in this_front)){
  this_front["level"] = 0;
}

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

// adjust default values given the challenge level
function adjust_for_challenge(value, challenge_dict){
  let new_value = value
  if (this_front.challenge_level in challenge_dict){
    new_value = value + challenge_dict[this_front.challenge_level];
  }
  return new_value;
}

// Returns the final statblock
function wholestat(){
  return [
    "```statblock",
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
  let percep_list = [];
  
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
  let ac_value = ac_dict[this_front.level.toString()];
  let fortitude_value = saves_dict[this_front.level.toString()];
  let reflex_value = saves_dict[this_front.level.toString()];
  let will_value = saves_dict[this_front.level.toString()];
  let ac_list = [];
  
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
    ac_value = adjust_for_challenge(ac_value, ac_level_mod);
  }
  // Override ac if in header
  if ("ac" in  this_front){
    ac_value = this_front.ac;
  }

  // saves setting 
  if (this_front.challenge_level){
    fortitude_value = adjust_for_challenge(fortitude_value, save_level_mod);
    will_value = adjust_for_challenge(will_value, save_level_mod);
    reflex_value = adjust_for_challenge(reflex_value, save_level_mod);
  }
  // saves overides
  if ("saves" in this_front){
    if ("fortitude" in this_front.saves){
      fortitude_value = this_front.saves.fortitude;
    }
    if("reflex" in this_front.saves){
      reflex_value = this_front.saves.reflex;
    }
    if("will" in this_front.saves){
      will_value = this_front.saves.will; 
    }
  } 

  ac_list.push(`ac: ${ac_value}`);
  ac_list.push("armorclass:");
  ac_list.push("  - name: AC")
  ac_list.push(`    desc: "${ac_value}; __Fort__: +${fortitude_value} (1d20+${fortitude_value}); __Ref__: +${reflex_value} (1d20+${reflex_value}); __Will__: +${will_value} (1d20+${will_value});"`)
  return ac_list.join("\n")
}

// Builds components of a stat block
function statcontents(){
  return [
   makeinfoblock(),
   buildTraits(),
   buildPercep(),
   buildAC()
  ].join("\n")
}

dv.paragraph(wholestat())
