const db = require("quick.db");
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
const ms = require("ms");
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "new",
  aliases: ["create"],
  run: async(client, message, args) => {
    let prefix =  db.get(` ${process.env.owner}.prefix`)
    if(prefix === null) prefix = process.env.prefix;
      let color = db.get(`${process.env.owner}.color`) 
       if(color === null  ) color = process.env.color
    var guild = message.guild
            if(!guild.me.hasPermission("ADMINISTRATOR")){
    return;
            }
    

    let channel3 = await db.fetch(`setuped_${message.guild.id}`);
    if(channel3 == null)
    {
      return message.reply("Tu n'as pas setup de salons tickets, fait `"+prefix+"setup`");
    }
    if(channel3 != message.channel.id)
    {
      return message.reply(`Utilise cette commande dans le salon ticket`)
    }
   if(message.author.bot){
			return;
		}
 let user = message.author;
       let timeout = "600000";
        var weekly =  db.fetch(`messageem_${message.guild.id}_${user.id}`);
   if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
    message.delete().catch(err => { })
    message.channel.send("Tu ne peux créé des tickets que chaques heures pour éviter des spams").then(msg => {msg.delete({ timeout: 10000})}).catch(err => { });;
   } else {

   db.set(`messageem_${message.guild.id}_${user.id}`, Date.now());

 
if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
    message.delete().catch(err => { })
			return message.reply('Tu as déjà un ticket, ferme le pour en recréé un!').then(msg => {msg.delete({ timeout: 10000})}).catch(err => { });;
		}

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
            message.delete().catch(err => { })
			message.reply(`Tu as correctement créé un ticket, clique sur ${channel} pour voir ton salon.`).then(msg => {msg.delete({ timeout: 10000})}).catch(err => { });;
   

            // inside a command, event listener, etc.
            const embed = new MessageEmbed()
            .setDescription("Un staff va venir rapidement\npour fermer ce ticket, faites `"+prefix+"close`")
            channel.send("<@"+message.author + ">")
            channel.send(embed);
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
			if(logchannel) {

				logchannel.send(`Ticket ${message.author.id} Créé. Appuie sur <#${channel.id}> poour le `);
			}
		});
   }
}
}

