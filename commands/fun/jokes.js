
const fetch = require('node-fetch');

module.exports = {
    name: "jokes",
    description: "Get jokes",
    async execute(message,args,client) {
     try{
        fetch("https://official-joke-api.appspot.com/random_joke")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const jokes = {
                    title: "Jokes",
                    color: 3973927,
                    fields: [
                        {
                            name: `:rofl: ${data["setup"]} :rofl:`,
                            value: data["punchline"],
                        },
                    ],
                    timestamp: new Date(),
                };
                msg.channel.send({ embeds: [jokes] });
            });
        } catch(err){
            message.channel.send("API Error")
        }
    },
}