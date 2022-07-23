const db = require("quick.db");
const Discord = require("discord.js");
module.exports = {
  name: "setup",
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
    const log = message.guild.channels.cache.find(log => log.name === "ticket-box")
  if(log)
  {
    return message.reply("Tu as déjà setup des tickets")
  }
message.guild.channels.create(`ticket-box`, {
			permissionOverwrites: [
				
			
				{
					id: message.guild.roles.everyone,
					allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
				},
			],
			type: 'text',
		}).then(async channel => {
      const embed = new Discord.MessageEmbed()
      .setTitle(`Ticket Box`)
      .setDescription("Fait `"+prefix+"new` pour créé un ticket")
      channel.send(embed);
      let vc1 = "600";
 channel.setRateLimitPerUser(vc1, `Responsible - ${message.member}`);
 db.set(`setuped_${message.guild.id}`, channel.id);
    })
    message.reply("Les messages de tickets seront acceptés seulement dans ticket-box")
  }}}