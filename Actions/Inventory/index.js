const fs = require('fs');

// inventory storage
var invs = {};

// should only be called when server starts
function init() {
  try {
    invs = require("./UserInvs.json");
    //console.log("Inventory read from file", invs);
  }
  catch{
    writeFile();
  }
}


function userInit(guild, user) {
  // need to setup guild for the first time?
  if (invs[guild.id] === undefined) {
    invs[guild.id] = {};
  }

  //need to setup user for the first time?
  if (invs[guild.id][user.id] === undefined) {
    invs[guild.id][user.id] = [{ count: 1, name: "No Tea" }, { count: 1, name: "A Splitting Headache" }];
  }
}

function writeFile() {
  fs.writeFile(__dirname + "/UserInvs.json", JSON.stringify(invs, null, 2), (err) => {
    if (err) { return console.error("Oops! - " + err); }
    console.log("Wrote Inventory to File")
  });
}


function addItem(room, guild, user, count, name) {
  // check if item exists
  let heldItem = invs[guild.id][user.id].find(item => item.name.toLowerCase() === name.toLowerCase());

  if (heldItem) {
    heldItem.count = parseInt(heldItem.count) + parseInt(count);
    room.send(`Set ${heldItem.name}'s count to ${heldItem.count} in ${user}'s Inventory`);

  }
  else {
    invs[guild.id][user.id].push({ name: name, count: count });
    room.send(`Added ${count} ${name} to ${user}'s Inventory`);
  }
  writeFile();
}


function removeItem(room, guild, user, count, name) {
  // check if item exists
  let heldItem = invs[guild.id][user.id].find(item => item.name.toLowerCase() === name.toLowerCase());

  if (heldItem && (count === 'all' || heldItem.count >= count)) {

    if (count === 'all') {
      heldItem.count = 0;
    }
    else {
      heldItem.count = parseInt(heldItem.count) - parseInt(count);
    }

    if (heldItem.count > 0) {
      room.send(`Set ${heldItem.name}'s count to ${heldItem.count} in ${user}'s Inventory`);
    }

    else {
      invs[guild.id][user.id] = invs[guild.id][user.id].filter(item => item.name.toLowerCase() !== name.toLowerCase());
      room.send(`Removed ${heldItem.name} from ${user}'s Inventory`);
    }
    writeFile();
  }
  else {
    room.send(`${user} does not have ${count} ${name} in their Inventory`);
  }
}


function search(room, guild, user, searchTerm){
  try {
    let items = invs[guild.id][user.id];
    let formattedItems = items.map((item, index) => item.name.toLowerCase().includes(searchTerm.toLowerCase())?
      `#${("000" + index).slice(-3)} - ${item.name} x ${item.count}`
      :''
    ).join("\n");

    console.log(formattedItems);
    return room.send(`\`\`\`${formattedItems ? formattedItems : "Nothing to show"}\`\`\``);
  }
  catch (err) {
    console.error(err)
    return room.send(`Something went wrong searching ${user}'s Inventory!`)
  }
}


function printInv(room, user, guild) {
  try {
    let items = invs[guild.id][user.id];
    let formattedItems = items.map((item, index) => `#${("000" + index).slice(-3)} - ${item.name} x ${item.count}`).join("\n");

    console.log(formattedItems);
    return room.send(`\`\`\`${formattedItems ? formattedItems : "Nothing to show"}\`\`\``);
  }
  catch (err) {
    console.error(err)
    return room.send(`Something went wrong returning ${user}'s Inventory!`)
  }
}


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
  init: init
}