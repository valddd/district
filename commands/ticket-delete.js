const db = require("quick.db");
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
module.exports = {
  name: "ticket-delete",
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

if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.hasPermission('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`) {
				const channel = message.channel
                if(channel === message.channel) {
                    channel.delete().catch(err => { })
                }
			}
		}
		else {
			return message.reply('Utilisez la commande dans un ticket.');
		}

}
}
}