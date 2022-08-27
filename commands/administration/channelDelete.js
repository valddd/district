const {Client, Message} = require('discord.js')

module.exports = {

  name:'channeldelete',
  description: 'Deletes a new channel',


  async execute(message, args,client){

    if(!message.member.permissions.has('MANAGE_CHANNELS')){
      return message.channel.send({content:'Perms Denied'})
    }
    if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send({content:'I must have ADMIN command to run this command'})
  }

    const channelTarget = message.mentions.channels.first()

    if(!channelTarget){
      return message.channel.send({content:'Please specify a channel name'})
    }

    channelTarget.delete().then((ch) => {
        message.author.send({content:`Channel has been deleted`})
    });



  }


}
