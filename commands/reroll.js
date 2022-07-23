const ms = require('ms');
const config = require("../config.json")
const { GiveawaysManager } = require('discord-giveaways');
module.exports = {
        name: "reroll",
        description: "Rerolls a giveaway.",
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
            return message.channel.send(':boom: Impossible de trouvé ce message, met l\'id du message!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Je ne trouve pas de giveaway pour `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send('Giveaway Reroll!');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has not ended.`)) {
                    message.channel.send('Le giveaway n\'est pas fini!');
                } else {
                    console.error(e);
                    message.channel.send('erreur...');
                }
            });
    }
}


}