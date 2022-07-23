const db = require("quick.db")
   module.exports = {
    name: "reaction-role-remove",
    aliases: ["reactionrole-remove"],
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
      if(!args[0])
      {
        return message.reply("Donne moi l'id du message");
      }
      if(!args[1])
      {
        return message.reply("Donne moi l'emoji à enlever");
      }
  client.reactionRoleManager.delete({
            messageID: args[0],
            reaction: args[1],
          });
  message.channel.send(`Reaction supprimer`);
   
  
  return;
  }}}
    