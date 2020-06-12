const Discord = require ('discord.js');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log ("Connected as " + client.user.tag);

  client.user.setActivity("D&D with friends");

  client.guilds.cache.forEach(guild => {
    console.log(guild.name);
  });

  console.log(client.channels);
  client.channels.cache.forEach(channel => {
    console.log(`${channel.name} ${channel.type} ${channel.id}}`)
  });

  //general chat id = 721070289160503369

  let generalChannel = client.channels.cache.find(chat => chat.id === "721070289160503369");
  console.log(`\n\n\n\n=======================\n${generalChannel}\n=======================`);
  generalChannel.send("Hello, World!");

});

client.login(process.env.clientToken);