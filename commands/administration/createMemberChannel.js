const {Client, Message, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/member-count')

module.exports = {
    name: 'createmember',
    description:'creates a member count channel',

    async execute(message,args,client){
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Perms Denied'})
        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }
        Schema.findOne({Guild : message.guild.id}, async(err, data) => {
            try{
            if(data) data.delete()

            const channel = await message.guild.channels.create(
                `Members: ${message.guild.memberCount}`,
                {
                    type:'Voice',
                    permissionsOverwrites:[
                    {

                        id:message.guild.id,
                        deny:['CONNECT'],
                    }
                ],
                
                
                }
            );

            new Schema({
                Guild: message.guild.id,
                Channel:channel.id,
                Member: message.guild.memberCount
            }).save()
        } catch(err){
            console.log(err)
        }
        })
    }


}