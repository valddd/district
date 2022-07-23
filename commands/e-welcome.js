const db = require("quick.db");
module.exports = {
  name: "e-welcome",
  aliases: [],
  run: async(client, message, args) => {
    let prefix =  db.get(` ${process.env.owner}.prefix`)
    if(prefix === null) prefix = process.env.prefix;
      let color = db.get(`${process.env.owner}.color`) 
       if(color === null  ) color = process.env.color
    var guild = message.guild
            if(!guild.me.hasPermission("ADMINISTRATOR")){
    return;
            }
    
            if(process.env.owner ===message.author.id   || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true ) {
if(!args[0])
{
  return message.channel.send("Tu dois mettre un salon!!");
}

if (args[0] == "off"){
    db.set(`ichannel_${message.guild.id}`, "disable")
    message.channel.send("Welcome désactiver")
}
else{
  var wchannel =  message.mentions.channels.first()


 
 db.set(`ichannel_${message.guild.id}`, wchannel.id)
 message.channel.send(`Ton salon (${wchannel}) serra le nouveau salon de bienvenue`);
}


  }
}}