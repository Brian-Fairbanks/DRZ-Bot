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



function process(room, user, guild, args) {
  userInit(guild, user);

  // did they pass any extra commands?  if not, return inv
  if (args.length == 1) {
    return printInv(room, user, guild);
  }

  // check second arg
  switch (args[1]) {
    case 'a':
    case 'add':
      if (args[2] && !isNaN(args[2]) && args[3]) {
        console.log("adding with count");
        addItem(room, guild, user, args[2], args.slice(3).join(" "));
      }
      else if (args[2]) {
        console.log("adding 1 of item");
        addItem(room, guild, user, 1, args.slice(2).join(" "));
      }
      else {
        room.send(`Something went wrong with adding to ${user}'s Inventory!`)
      }
      break;
    case "r":
    case "remove":
      if (args[2] && !isNaN(args[2]) && args[3]) {
        console.log("removing with count");
        removeItem(room, guild, user, args[2], args.slice(3).join(" "));
      }
      else if (["a", "all"].includes(args[2]) && args[3]) {
        console.log("removing all of item");
        removeItem(room, guild, user, 'all', args.slice(3).join(" "));
      }
      else if (args[2]) {
        console.log("removing 1 of item");
        removeItem(room, guild, user, 1, args.slice(2).join(" "));
      }
      else {
        room.send(`Something went wrong with removing from ${user}'s Inventory!`)
      }
      break;
    case "s":
    case "search":
    case "f":
    case "find":
      if(args[2]){
        search(room, guild, user, args.slice(2).join(" "));
      }
      else{
        room.send(`Search for what?`)
      }
      break;
    default:
      room.send(`reached end of switch`)
      break
  }
}

module.exports = {
  process: process,
  //init: init
}