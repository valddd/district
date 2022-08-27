const {Client, Message} = require('discord.js')

module.exports = {

  name:"channelcreate",
  description: 'creates a new channel',


  async execute(message, args,client){

    if(!message.member.permissions.has('MANAGE_CHANNELS')){
      return message.channel.send({content:'Perms Denied'})
    }
    if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send({content:'I must have ADMIN command to run this command'})
  }

    const channelNameQuery = args.join(" ");

    if(!channelNameQuery){
      return message.channel.send({content:'Please specify a channel name'})
    }

  message.guild.channels.create(channelNameQuery).then((ch) => {
        message.channel.send({content:`Click ${ch} to access the newly created channel`})
    });
  },


};
