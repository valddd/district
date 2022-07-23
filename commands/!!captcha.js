const db = require('quick.db')
const discord = require('discord.js')

module.exports = {
    name: 'captcha',
    aliases: [],
    run: async (client, message, args) => {
        if(process.env.owner ===message.author.id   || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true ) {
        const footer = client.user.username
        const guild = message.guild;
        if(!guild.me.hasPermission("ADMINISTRATOR")){
return;
        }
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
   let config = args[0]
   if (!config) return message.channel.send(`:x: | **Veuillez écrire \`${prefix}captcha channel\` \`${prefix}captcha role\` \`${prefix}captcha logs\` \`${prefix}captcha autokick\`**`)
   if (!["channel", "role", "logs", "autokick"].includes(config)) return message.channel.send(`**Veuillez écrire \`${prefix}captcha channel\` \`${prefix}captcha role\` \`${prefix}captcha logs\` \`${prefix}captcha autokick\`**`)
    if (args[0] == "channel"){
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
        if (!channel) { return message.channel.send(":x: | **Salon non trouvé**") }
        db.set(`verifyChannel_${message.guild.id}`, channel.id)
        return message.channel.send("✅ | **Le salon de vérification a est "+channel.toString()+"**")
    }
    if (args[0] == "role"){
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if (!role) { return message.channel.send(":x: | **Rôle non trouvé**") }
        db.set(`verifyRole_${message.guild.id}`, role.id)
        return message.channel.send("✅ | **la rôle de vérification a été mise pour "+role.toString()+"**")
    }
    if (args[0] == "autokick"){
        let yesnt = args[1]
        if (!yesnt) return message.channel.send(`:x: | ** veuillez écrire \`${prefix}captcha autokick on\` \`${prefix}captcha autokick of\`**`)
        if (!["on", "off"].includes(yesnt)) { return message.channel.send(`):x: | **les seules options sont \`${prefix}captcha autokick on\` \`${prefix}captcha autokick off\`**`)}
        let tog;
        if (yesnt === "on") tog = true;
        if (yesnt === "off") tog = false;
        let yes = tog === true ? "activé**":"désactivé**"
        db.set(`autokick_${message.guild.id}`, tog)
        message.channel.send("✅ | **L'autokkick a été " + yes)
    }
    if (args[0] == "logs"){
        let channell = message.mentions.channels.first() || message.guild.roles.cache.get(args[1])
        if (!channell) return message.channel.send(":x: | **Veuillez choisir un salon!**")
        db.set(`logs_${message.guild.id}`, channell.id)
        message.channel.send("✅ | **Le salon des logs a est " + channell.toString() + "**")
    }



}
}
}