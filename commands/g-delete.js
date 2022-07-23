const db = require("quick.db")
module.exports = {
    name: "g-delete",
    aliases: ["gcancel", "gdelete"],
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
  
  
      if(!args[0]){
          return message.channel.send(':x: Tu dois mettre un id de message valide!');
      }
  
      let messageID = args[0];
          client.giveawaysManager.delete(messageID).then(() => {
              message.channel.send("✅ Giveaway supprimé!");
          }).catch((err) => {
              message.channel.send(`:x: Aucun giveaway pour \`${messageID}\`.`);
          });
  }}}