const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
client.once('ready', () => {
    console.log('Ready!');
});
//This branch is specifically for CEA and is the LIVE build.

client.login(process.env.BOT_TOKEN);

client.on("channelCreate", (channel) => {

    var message = new Discord.Message(client, null, channel);
    const valorant = message.guild.emojis.cache.find(emoji => emoji.name === 'Valorant');
    const siege = message.guild.emojis.cache.find(emoji => emoji.name === 'Siege');

    let text = 'Welcome to CEA ticket support. \n \n \nPlease select the most appropriate category regarding your inquiry by reacting to this message. \n🗒️: General \n<:Valorant:742176274163695726>: Valorant \n<:Siege:742176288323928106>: Siege';
    message.channel.send(text).then(async (sentmessage) => {
        const filter = (reaction, user) => {
            return reaction.emoji.name === '1️⃣' || '2️⃣';
        }

        var collector = sentmessage.createReactionCollector(filter)

        collector.on('collect', async (reaction, user) => {
            let roles = await message.guild.roles.fetch()
            const allowedRoles = ['Statistics', 'Production'];
            const rolemap = roles.cache.filter(role => allowedRoles.includes(role.name))
            switch (reaction.emoji.name) {
                case '1️⃣': //STATISTICS
                    roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                    console.log(rolemap.get('586678103762272257'))
                    await message.channel.overwritePermissions([
                        {
                            id: rolemap.get('586678103762272257').id,
                            deny: ['VIEW_CHANNEL'],
                        },
                    ], 'Changed permissions');
                    console.log('post-if statement')
                    break;
                case '2️⃣': //PRODUCTION
                    roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                    console.log(rolemap.get('512431819400937496'))
                    await message.channel.overwritePermissions([
                        {
                            id: rolemap.get('512431819400937496').id,
                            deny: ['VIEW_CHANNEL'],
                        },
                    ], 'Changed permissions');
                    console.log('post-if statement')
                    break;
                default:
                    console.log('No reaction');
                    break;
            }

        })

        sentmessage.react('1️⃣');
        sentmessage.react('2️⃣');

        // THESE REACTIONS DO NOT SERVE ANY PURPOSE BESIDES IDENTIFICATION
        sentmessage.react('🗒️');
        sentmessage.react(valorant);
        sentmessage.react(siege);

        // reaction to message for role
        //add emojis for other reactions
    })
});


