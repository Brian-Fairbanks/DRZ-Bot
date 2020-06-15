// Import all Actions
const Inventory = require('./Inventory')
const Rolls = require('./Roll')

// Initializing data strcuctures...
function init(){
  Inventory.init();
}

// Process message
function process(msg, client){  // ignore messages from myself
  if (msg.author === client.user){return;}
  if (msg.content[0]!== '`'){return;}

  //console.log(msg);

  let returnAddress = msg.channel;

  let fullCommand = msg.content.substr(1);
  let args = fullCommand.split(" ");
  let command = args[0];

  switch(command){
    case "i":
    case "inv":
      Inventory.process(returnAddress, msg.author, msg.guild, args);
      break;
    case "r":
    case "roll":
      Rolls.process(returnAddress, msg.author, msg.guild, args);
      break;
    default:
      return;
  }
}


module.exports = {
  process: process,
  init: init
}