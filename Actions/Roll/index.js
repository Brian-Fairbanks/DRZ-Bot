// const fs = require('fs');

// // inventory storage
// var rolls = {};

// // should only be called when server starts
// function init() {
//   try {
//     rolls = require("./UserRolls.json");
//     console.log("Rolls read from file", rolls);
//   }
//   catch{
//     writeFile();
//   }
// }


// function userInit(guild, user) {
//   // need to setup guild for the first time?
//   if (rolls[guild.id] === undefined) {
//     rolls[guild.id] = {};
//   }

//   //need to setup user for the first time?
//   if (rolls[guild.id][user.id] === undefined) {
//     rolls[guild.id][user.id] = [{ count: 1, name: "No Tea" }, { count: 1, name: "A Splitting Headache" }];
//   }
// }

// function writeFile() {
//   fs.writeFile(__dirname + "/UserInvs.json", JSON.stringify(rolls, null, 2), (err) => {
//     if (err) { return console.error("Oops! - " + err); }
//     console.log("Wrote Rolls to File")
//   });
// }

// logic for randomized rolls, and formating results
function rollLogic(number, dice) {
  const rolls = []
  var sum = 0;
  for (i = 0; i < number; i++){
    const roll = 1+Math.floor(Math.random()*dice);
    rolls.push(roll);
    sum+=roll;
  }
  return {rolls,sum};
}


function parse(args){
  // force to lower case
  args = args.toLowerCase();
  // preserve minus, while tokenizing
  args = args.replace("-","+-")

  var parts = args.split(/[+,; ]/);
  // may create null tokens
  parts = parts.filter(token => token!='');
  console.log(parts);

  let total = 0;
  let dice = [];

  var lastToken = ""

  parts.forEach(part => {
    // check if dice roll
    if (part.match(/\d*d\d+/gi)){
      console.log(part," - diceRoll");
      let data = part.split("d");
      let results;

      results = rollLogic(data[0]?data[0]:1, data[1])

      // console.log(part);
      // console.log(results.rolls);
      // console.log(results.sum);
      // console.log ("===============");

      dice.push({die:data[1], rolls:results.rolls});
      total += results.sum;
    }
    // otherwise
    else if (part.match(/min\d+/gi)){
      const min = part.replace("min","");
      dice[dice.length-1].rolls =  dice[dice.length-1].rolls.map(roll => {
        console.log(roll, min);
        if (roll >= min){
          return roll
        }
        else{
          total+=min-roll;
          return min;
        }
      });
    }
    else if (part.match(/min+/gi)){
      lastToken = "min";
    }
    else if(!isNaN(part) && lastToken === "min"){
      lastToken = "";
      const min = part;
      dice[dice.length-1].rolls =  dice[dice.length-1].rolls.map(roll => {
        console.log(roll, min);
        if (roll >= min){
          return roll
        }
        else{
          total+=min-roll;
          return min;
        }
      });
    }
    else if(!isNaN(part)){
        console.log(part," - number");
        total+= parseInt(part);
    }
    else{
      console.log(part," - stat");
      switch(part){
        case "s":
        case "sa":
        case "sasc":
        case "sort":
        case "sorta":
        case "sortasc":
          if(dice.length >= 1){
            dice[dice.length-1].rolls = dice[dice.length-1].rolls.sort((a,b)=>a-b);
            dice[dice.length-1].modified="Sorted"
          }
        }
      }
    })

  let formattedDice = dice.map(set => `d${set.die}${set.modified?` ${set.modified}`:""}:[${set.rolls}]`)

  console.log(`Rolls:${formattedDice}\nTotal:${total}`);
  return {dice:formattedDice, total}
}


function process(room, user, guild, args) {
  // userInit(guild, user);
  let expStart = 1;
  let type="normal"
  if(["adv", "dis"].includes(args[1])){
    //room.send(`\`\`\`run logic for dis/advantage\`\`\``);
    type=args[1];
    expStart +=1;
  }

  fullExpr = args.slice(expStart).join(" ")

  // Normal Roll
  if(type==="normal"){
    const {dice, total} = parse(fullExpr)
    room.send(`\`\`\`#${total}\n${dice.join("  ")}\`\`\``);
  }
  // Advantage Roll
  else if(type==="adv" || type ==="dis"){
    let {dice, total} = parse(fullExpr)
    let {dice:dice2 , total:total2} = parse(fullExpr)

    dice=dice.join("  ");
    dice2=dice2.join("  ");

    let format1;
    let format2;

    if(total > total2){
      format1 = `\`\`\`css\nTotal:${total}\n${dice}\`\`\``;
      format2 = `\`\`\`Total:${total2}\n${dice2}\`\`\``;
    }
    else{
      format1 = `\`\`\`Total:${total}\n${dice}\`\`\``;
      format2 = `\`\`\`css\nTotal:${total2}\n${dice2}\`\`\``;
    }

    room.send(`${format1}\n${format2}`)
  }
}

module.exports = {
  process: process,
  //init: init
}