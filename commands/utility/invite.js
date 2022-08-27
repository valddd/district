const Discord = require('discord.js')

module.exports = {
  name: 'invite',
  description: 'gives you invite',

  async execute(message,args, client){

    const embed = new Discord.MessageEmbed()
    if(args[0] == 'create'){
         let channel = message.channel;
         channel.createInvite({unique: true})
         .then(invite=> {
           embed
           .setTitle(message.author.username + "'s Invite")
           .setThumbnail(message.guild.iconURL({ dynamic: true }))
           .setDescription("https://discord.gg/" + invite.code)

           message.channel.send({embeds:[embed]})
         })
      }

      else {
        embed
         .setTitle("error")
         .setDescription("This command was not used correctly")
      message.channel.send({embeds:[embed]})



      }


  }
}
