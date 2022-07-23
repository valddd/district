const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
name: 'join-settings',
run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
   var guild = message.guild
        if(!guild.me.hasPermission("ADMINISTRATOR")){
return;
        }
if(process.env.owner ===message.author.id   || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true ) {
    const embed = new Discord.MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setTitle("Join Settings")
    .addField(`\`${prefix}e-welcome <salon/on>\``, "Permet d'activer l'embed de bienvenue")
    .addField(`\`${prefix}e-welcome off\``, "Permet de désactiver l'embed de bienvenue")
    .addField(`\`${prefix}w-eimage <off/defaut>\``, "Supprime l'image de bienvenue ou la remet par défaut")
    .addField(`\`${prefix}w-eimage <lien>\``, "Personnalise l'image de bienvenue")
    .addField(`\`${prefix}w-emessage <defaut/message>\``, "Met par défaut l'image de bienvenue ou la personnalise")
    .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs\nSi ce ne sont pas des mentions ils doivent être séparés par \`,,\`*`)
    .setFooter(`${client.user.username}・Prefix actuel : ${prefix}`)
    .setColor(color)
    message.channel.send(embed)
}
}
}