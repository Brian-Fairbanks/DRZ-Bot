const Discord = require ('discord.js');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log ("Connected as " + client.user.tag)
})

client.login(process.env.clientToken);