const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
require("dotenv").config();
const schema = require("../schemas/Guild");
const token = process.env.token;
let prefix = process.env.prefix;
const reactionMenu = require("discordv13-pagination")
const image = `https://cdn.discordapp.com/attachments/945812190936584233/1013103343687712841/19_69.gif`



module.exports = {
    name: "help",
    description: "Affiche toutes les commandes du bot.",
    async execute(message, args, client) {

        if(!message.guild.me.permissions.has('SEND_MESSAGES')){
            return message.channel.send({content:":x: J'ai besoin des permissions d'envoyer des messages pour utiliser cette commande."})
        }
        await schema.findOne(
            { guildID: message.guild.id },
            async (err, data) => {
                if (!data) {
                    prefix = process.env.prefix;
                } else {
                    prefix = data.prefix;
                }
            }
        );
        const roleColor =
            message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
        var commands = {};
        readdirSync("./commands/").forEach((dir) => {
            if (dir.indexOf(".") == -1) {
                commands[dir] = readdirSync(`./commands/${dir}`);
            }
        });
        if (!args[0]) {
            message.channel.send({embeds:[
                new MessageEmbed()
                    .setTitle("📬 Besoin d'aide ? Toutes mes commandes:")
                    .addFields(
                        {
                            name: "⚙ Administration",
                            value: "```" + prefix + "help administration```",
                        },
                        {
                            name: "🎮 Fun",
                            value: "```" + prefix + "help fun```",
                        },
                        {
                            name: "📜 Levels",
                            value: "```" + prefix + "help levels```",
                        },
                        {
                            name: "🔒 Owner",
                            value: "```" + prefix + "help owner```",
                        },
                        {
                            name: "🛠 Utility",
                            value: "```" + prefix + "help utility```",
                        },
                        {
                            name: ":frame_photo: Images",
                            value: "```" + prefix + "help images```",
                        },
                        {
                            name: ":video_game: GameInfo",
                            value: "```" + prefix + "help gameinfo```",
                        }
                    )
                    .setDescription(
                        `Utilisez \`${prefix} help\` suivi du nom d'une commande pour en savoir plus. Par exemple: \`${prefix} help ban\`.`
                    )
                    .setImage(image)
                    .setColor("#2F3136")
                    ]});
        } else {
            if (commands[args[0]] != undefined) {
                var temp = [];
                let categories = [];
                var counter = 0;
                readdirSync("./commands/" + args[0]).forEach((dir) => {
                    temp.push({
                        name: dir.substring(0, dir.indexOf(".")),
                        value: "\u200B",
                        inline: true,
                    });
                    counter++;
                    if (counter == 24) {
                        counter = 0;
                        categories.push(temp);
                        temp = [];
                    }
                });
                categories.push(temp);
                var  listOfEmbed = [];
                if (categories.length <= 1) {
                    const a = new MessageEmbed()
                        .setTitle("📬 Besoin d'aide ? Toutes mes commandes:")
                        .addFields(temp)
                        .setDescription(
                            `Utilisez \`${prefix} help\` suivi du nom d'une commande pour en savoir plus. Par exemple: \`${prefix} help ban\`.`
                        )
                        .setFooter(
                            `Demandé par ${message.author.tag}`,
                            message.author.displayAvatarURL({
                                dynamic: true,
                            })
                        )
                        .setTimestamp()
                        .setColor("#2F3136")
                    message.channel.send({embeds:[a]});
                } else {
                    for (var i = 0; i < categories.length; i++) {
                        listOfEmbed.push(
                            new MessageEmbed()
                                .setTitle(
                                    "📬 Besoin d'aide ? Toutes mes commandes:"
                                )
                                .addFields(categories[i])
                                .setDescription(
                                    `Utilisez \`${prefix} help\` suivi du nom d'une commande pour en savoir plus. Par exemple: \`${prefix} help ban\`.`
                                )
                                .setFooter(
                                    `Demandé par ${message.author.tag}`,
                                    message.author.displayAvatarURL({
                                        dynamic: true,
                                    })
                                )
                                .setTimestamp()
                                .setColor("#2F3136")
                        );
                    }

                    reactionMenu(message, listOfEmbed)
                   
            
                }
            } else {
                const command =
                    client.commands.get(args[0].toLowerCase()) ||
                    client.commands.find(
                        (c) =>
                            c.aliases &&
                            c.aliases.includes(args[0].toLowerCase())
                    );

                if (!command) {
                    const embed = new MessageEmbed()
                        .setTitle(
                            `Commande invalide ! Utilisez \`${prefix}help\` pour voir mes commandes.`
                        )
                        .setColor("FF0000");
                    return message.channel.send({embeds:[embed]});
                }

                const embed = new MessageEmbed()
                    .setTitle("Détails Commande:")
                    .addField("PREFIX:", `\`${prefix}\``)
                    .addField(
                        "COMMAND:",
                        command.name
                            ? `\`${command.name}\``
                            : "Aucun nom pour cette commande."
                    )
                    .addField(
                        "ALIASES:",
                        command.aliases
                            ? `\`${command.aliases.join("` `")}\``
                            : "Aucun aliases pour cette commande."
                    )
                    .addField(
                        "USAGE:",
                        command.usage
                            ? `\`${prefix}${command.name} ${command.usage}\``
                            : `\`${prefix} ${command.name}\``
                    )
                    .addField(
                        "DESCRIPTION:",
                        command.description
                            ? command.description
                            : "Aucune description pour cette commande."
                    )
                    .setFooter(
                        `Demandé par ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setTimestamp()
                    .setColor("#2F3136")
                return message.channel.send({embeds:[embed]});
            }
        }
    },
};
