// To be included in a dataviewjs block

const this_front = dv.current().file.frontmatter

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
  "19": 32,
  "20": 33
};


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
  let percep_value = 6;
  let percep_list = [];

  const percep_level_mod = {
    "low": -3,
    "high": 3
  };
  
  if ("perception" in  this_front){
    percep_value = this_front.perception;
  } else if("level" in this_front){
    percep_value = percep_dict[this_front.level.toString()];
  }
  
  if (this_front.challenge_level){
    if (this_front.challenge_level in percep_level_mod){
      percep_value = percep_value + percep_level_mod[this_front.challenge_level];
    }
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

// Builds components of a stat block
function statcontents(){
  return [
   makeinfoblock(),
   buildTraits(),
   buildPercep()
  ].join("\n")
}

dv.paragraph(wholestat())
