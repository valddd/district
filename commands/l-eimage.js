const db = require("quick.db")
module.exports = {
  name: "l-eimage",
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
    message.channel.send("Veuillez utiliser la commande de cette façon: `l-image <defaut/offLlien>`")
}

if (args[0] == "defaut"){
    db.set(`limage_${message.guild.id}`, "https://www.fanbolt.com/storage/2021/08/anime-iphone-wallpaper-800x500.jpg")
    db.set(`limageon_${message.guild.id}`, "on")
    message.channel.send("Image d'au revoir remis à défaut")
}
else if(args[0] == "off"){
    db.set(`limageon_${message.guild.id}`, "off")
    message.channel.send("Image d'au revoir supprimée")
}
else {
    db.set(`limage_${message.guild.id}`, args.slice(0).join(' '))
    db.set(`limageon_${message.guild.id}`, "on")
    message.channel.send("Image d'au revoir personnalisé mis avec succès")
}

            }
        }
    }