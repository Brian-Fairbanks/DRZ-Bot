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
  // remove spaces
  args = args.replace(" ","");
  // preserve minus, while token 
  args = args.replace("-","+-")

  const parts = args.split(/[+,; ]/);
  console.log(parts);

  let total = 0;
  let dice = [];

  parts.forEach(part => {
    // check if dice roll
    if (part.includes("d")){
      console.log(part," - diceRoll");
      let data = part.split("d");
      let results;

      results = rollLogic(data[0]?data[0]:1, data[1])

      console.log(part);
      console.log(results.rolls);
      console.log(results.sum);
      console.log ("===============");

      dice.push(`d${data[1]}:[${results.rolls}]`);
      total += results.sum;
    }
    // otherwise
    else{
      if(!isNaN(part)){
        console.log(part," - number");
        total+= parseInt(part);
      }
      else{
        console.log(part," - stat");
      }
    }
  })

  console.log(`Rolls:${dice}\nTotal:${total}`);
  return {dice, total}
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
    room.send(`\`\`\`Total:${total}\n${dice.join("  ")}\`\`\``);
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