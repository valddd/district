const {Client, Message, MessageEmbed} = require('discord.js');
const Schema = require('../../schemas/modlogs');
module.exports = {
    name:'setlog',
    description: 'Sets a mod log channel',

    async execute(message,args,client){
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Invalid Perms'});
        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({Guild: message.guild.id}, async (err,data) => {
            if(data) data.delete();
            new Schema({
                Guild:message.guild.id,
                Channel: channel.id,
            }).save();
            message.channel.send({content:`Mod Log Channel has been set to ${channel}`})
        })

    }

}