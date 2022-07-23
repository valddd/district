const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
name: 'leave-settings',
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
    .setTitle("Leave Settings")
    .addField(`\`${prefix}l-eleave <salon/on>\``, "Permet d'activer l'embed d'au revoir")
    .addField(`\`${prefix}l-eleave off\``, "Permet de désactiver l'embed d'au revoir")
    .addField(`\`${prefix}l-eimage <lien/defaut>\``, "Change l'image de l'embed d'au revoir ou la remettre par défaut")
    .addField(`\`${prefix}l-eimage off\``, "enlève totalement l'image de l'embed d'au revoir")
    .addField(`\`${prefix}l-emessage <defaut/message>\``, "Personnalise le message d'au revoir ou le remet par défaut")
    .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs\nSi ce ne sont pas des mentions ils doivent être séparés par \`,,\`*`)
    .setFooter(`${client.user.username}・Prefix actuel : ${prefix}`)
    .setColor(color)
    message.channel.send(embed)
}
}
}