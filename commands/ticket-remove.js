const db = require('quick.db')
module.exports = {
    name: "remove",
    aliases: [],
    run: async(client, message, args, data) => {
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
              const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
              if(!member) {
                  return message.channel.send(`Utilise la commande de cette façon: \`${prefix}remove <member>\``);
              }
              try{
                  message.channel.updateOverwrite(member.user, {
                      VIEW_CHANNEL: false,
                      SEND_MESSAGES: false,
                      ATTACH_FILES: false,
                      READ_MESSAGE_HISTORY: false,
                  }).then(() => {
                      message.channel.send(`${member} a été enlevé de ${message.channel}`);
                  });
              }
              catch(e) {
                  return message.channel.send('erreur...');
              }
          }
  
  }
  }
}