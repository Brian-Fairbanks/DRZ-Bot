const Discord = require ('discord.js');
const Actions = require ('./Actions');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log ("Connected as " + client.user.tag);

  client.user.setActivity("D&D with friends");

  //Load inventory settings from file
  Actions.init();

  // client.guilds.cache.forEach(guild => {
  //   console.log(guild.name);
  // });

  // console.log(client.channels);
  // client.channels.cache.forEach(channel => {
  //   console.log(`${channel.name} ${channel.type} ${channel.id}}`)
  // });

  //general chat id = 721070289160503369

  // let generalChannel = client.channels.cache.find(chat => chat.id === "721070289160503369");
  // console.log(`\n\n\n\n=======================\n${generalChannel}\n=======================`);
  // generalChannel.send("Hello, World!");
  // generalChannel.send({files: ["https://raw.githubusercontent.com/Brian-Fairbanks/DRZ-Bot/master/Assets/DRZ.png"]});

});

client.on("message", msg => {
  Actions.process(msg, client);
})

client.login(process.env.clientToken);