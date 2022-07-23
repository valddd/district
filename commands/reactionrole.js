const db = require("quick.db")
module.exports = {
    name: "reaction-role",
    aliases: ["rr", "reactionrole"],
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
        return message.reply("tu ne m'as pas donner de rôle - `"+prefix+"rr 🎉 6969696969 @Giveaway-Ping`\n En premier met une emote\nEn deuxième met l'id du message\nen troisième met l'ID du rôle ou le ping du rôle");
      }
      if(!args[1])
      {
        return message.reply("Tu ne m'as pas donner l'id d'un message valide");
      }
    var role2 = message.mentions.roles.first();
    
  
  if(!role2)
  {
    var role2 = args[2];
    var role2 = message.guild.roles.cache.get(role2);
  }
  
  if(!role2)
  {
    return message.reply("Tu ne m'as pas donner de rôle");
  }
  client.reactionRoleManager.create({
        messageID: args[1],
        channel: message.channel,
        reaction: args[0],
        role: role2
  })
  message.channel.send(`Fini, le bot va prendre du temps à mettre votre serveur dans la database`);
   await message.delete();
  
  return;
  }}}
    