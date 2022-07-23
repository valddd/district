const db = require("quick.db")
module.exports = {
  name: "w-eimage",
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
if (!args[0]){
    message.channel.send("Veuillez utiliser la commande de cette façon: `w-eimage <defaut/off>`")
}

if (args[0] == "defaut"){
    db.set(`wimage_${message.guild.id}`, "https://cdn.discordapp.com/attachments/965247522354388992/965275806429511690/banner.jpg")
    db.set(`wimageon_${message.guild.id}`, "on")
    message.channel.send("Image de bienvenue remis à défaut")
}
else if(args[0] == "off"){
    db.set(`wimageon_${message.guild.id}`, "off")
    message.channel.send("Image de bienvenue supprimée")
}
else {
    db.set(`wimage_${message.guild.id}`, args.slice(0).join(' '))
    db.set(`wimageon_${message.guild.id}`, "on")
    message.channel.send("Image de bienvenue personnalisé mis avec succès")
}

            }
        }
    }