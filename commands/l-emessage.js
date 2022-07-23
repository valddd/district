const db = require("quick.db")
module.exports = {
  name: "l-emessage",
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
    message.channel.send("Veuillez utiliser la commande de cette façon: `l-message <defaut/message>`")
}

if (args[0] == "defaut"){
    db.set(`lmessage_${message.guild.id}`, "**Un membre a quitter le serveur!!**\nau revoir, j'espère que tu as apprécié cet endroit")
    message.channel.send("Message d'au revoir remis à défaut")
}
else {
    db.set(`lmessage_${message.guild.id}`, args.slice(0).join(' '))
    message.channel.send("Message d'au revoir personnalisé mis avec succès")
}

            }
        }
    }