const Schema = require('../../schemas/warn')

module.exports = {

    name:'removewarn',
    description:'Removes a users warning',

    async execute(message,args,client){

     try{
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Perms denied'})

        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send({content:'Member not found'})

        Schema.findOne({guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) return message.channel.send({content:'Something went wrong'})

            if(data){
                let num = parseInt(args[1]) - 1;
                data.content.splice(num, 1)

                message.channel.send({content:`Warning number ${num} deleted`})

                data.save()
            } else{
                message.channel.send({content:'User does not have any warns'})
            }

        })

    }catch(err){
        console.log(err);
        message.channel.send("I do not have perms to use this command");
    }
 }
}