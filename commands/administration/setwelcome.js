const Schema = require('../../schemas/welcomeChannel')
const {Client, Message, MessageEmbed} = require('discord.js')
const mongoose = require('mongoose')


module.exports = {

    name:'setwelcome',
    description:'sets a welcome channel',

    async execute(message,args,client){
        if(!(message.member.permissions.has('ADMINSTRATOR'))) return message.channel.send({content:"Perms Denied"})
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send({content:"Please mention a channel"})
        Schema.findOne({Guild: message.guild.id}, async(err, data) => {
        try{
            if(data){
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }

            message.channel.send({content:`${channel} has been set as the welcome channel`})
        } catch(err){
            console.log(err)
        }
        })
        


    }
}