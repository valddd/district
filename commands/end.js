module.exports = {
        name: "end",
        description: "Ends a giveaway.",
        usage: "[message-id]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    run: async (client, message, args) => {
        const guild = message.guild;
        if(!guild.me.hasPermission("ADMINISTRATOR")){
return;
        }

        if(process.env.owner ===message.author.id   || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true ) {

        if (!args[0]) {
            return message.channel.send(':boom: Je ne trouve pas de message, met l\'id!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Hm. Aucun giveaway trouvé avec cet id `' + args.join(' ') + '`.');
        }
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
                message.channel.send('Le giveaway sera fini dans moins de ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' secondes...');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has already ended.`)) {

                    message.channel.send('Giveaway déjà fini!');

                } else {
                    console.error(e);
                    message.channel.send('erreur...');
                }
            });
    }
}

}