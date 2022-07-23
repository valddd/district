const db = require("quick.db")
module.exports = {
  name: "w-emessage",
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
    message.channel.send("Veuillez utiliser la commande de cette façon: `w-emessage <defaut/message>`")
}

if (args[0] == "defaut"){
    db.set(`wmessage_${message.guild.id}`, "**Un membre a rejoint le serveur!!**\nBienvenue sur ce serveur, j'espère que tu apprécie cet endroit")
    message.channel.send("Message de bienvenue remis à défaut")
}
else {
    db.set(`wmessage_${message.guild.id}`, args.slice(0).join(' '))
    message.channel.send("Message de bienvenue personnalisé mis avec succès")
}

            }
        }
    }