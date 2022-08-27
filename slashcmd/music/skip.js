const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports =  {
    name:'skip',
    description:'Skip Music In a Channel',
    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        if(queue.songs.length == 1) {
            return interaction.followUp({content:`Cannot Skip with only one song in queue`});
        }

        else{

        queue.skip()

        interaction.followUp({content:`Now Playing: ${queue.songs[1].name}`})
        }



    }
}