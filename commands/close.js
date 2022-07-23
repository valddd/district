const db = require("quick.db");
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
module.exports = {
  name: "close",
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
    
if(message.channel.name.includes('ticket-')) {
	        const ticketlog = db.get(`${message.guild.id}.ticketlog`)
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(process.env.owner ===message.author.id   || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true  || message.channel.name === `ticket-${message.author.id}`) {
				const raison = args[0]
				if (!raison) raison = 'aucune'
				message.channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Transcript du ticket: ${message.channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('erreur...');
					}
				
					const embed = new Discord.MessageEmbed()
						.setDescription(`Cliquez sur **Regarder** pour voir les messages
						[\`📄 Regarder\`](${response.url})`)
						.setColor('GREEN');
					member.send('Voici les transcripts du ticket', embed).catch(err => { });
				}).then(() => {
					try {
						message.channel.updateOverwrite(member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send(`Ticket ${message.channel} fermer avec succès`);
						});
					}
					catch(e) {
						return message.channel.send('An error occurred, please try again!');
					}
				})
				const logembed = new Discord.MessageEmbed()
				.setDescription(`
				**Personne qui a fermer le ticket:**
				${message.author.tag}(<@${message.author.id}>)

				**Raison de fermeture:**
				\`${raison}\`

				**Transcript:**
				[\`📄 Regarder\`](${response.url})`)
				.setColor('GREEN');
				if (ticketlog){
				ticketlog.send(logembed).catch(err => { });
				};
			}
		}
		else {
			return message.reply('you cannot use this command here. Please use this command when you\'re closing a ticket.');
		}

}
}