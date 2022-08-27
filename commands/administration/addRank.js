
const RankSchema = require("../../schemas/ranks")
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'addrank',
    description:'Adds Role Rank System',

    async execute(message,args,client){

        if(!message.member.permissions.has('ADMINISTRATOR')) return;
        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }

        const role = message.mentions.roles.first()
        const rankName = args.slice(1).join(" ");

        if(!role) return message.channel.send({content:'Please specify a role'})
        if(!rankName) return message.channel.send({content:'Please specify a role'})
       

        RankSchema.findOne({Guild: message.guild.id, Rank:rankName}, async(err, data) => {
            if(data) return message.channel.send({content:'Rank Already Exists'})
            else{
                data = new RankSchema({
                    Guild: message.guild.id,
                    Rank: rankName,
                    Role: role.id
                });
                data.save();

                message.channel.send({content:`${role} is new rank -> ${rankName}`})
            }
        })

    }
}
