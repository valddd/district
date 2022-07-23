const db = require('quick.db')
const snekfetch = require('snekfetch')
const discord = require ('discord.js')
module.exports = {
name: 'eval',
run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
   var guild = message.guild
        if(!guild.me.hasPermission("ADMINISTRATOR")){
return;
        }
        snekfetch.get('https://api.npoint.io/2d7a2d44b4686c712b49').then(r => {
    var owner = r.body.owners
if(owner.includes(message.author.id)){

if(!args[0]) return message.reply("Il faut mettre un code")
let tstatus = args.slice(0).join(" ")
        try {
            let codein = tstatus
            let code = eval(codein);
            if (typeof code !== 'string')
                code = require('util').inspect(code, {
                    depth: 0
                });
            let embed = new discord.MessageEmbed()
                .setColor(color)
                .addField(':inbox_tray: Entrée', `\`\`\`js\n${codein}\`\`\``)
                .addField(':outbox_tray: Sortie', `\`\`\`js\n${code}\n\`\`\``)
            message.channel.send(embed).then(message => message.delete(60000)).catch(err => { });
        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``).catch(err => { });
    }
}
}
)}
}
