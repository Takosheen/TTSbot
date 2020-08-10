const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
client.once('ready', () => {
    console.log('Ready!');
});
//This branch is specifically for CEA and is the LIVE build.

client.login(process.env.BOT_TOKEN);

client.on("channelCreate", (channel) => {
    var ping = true;
    if (ping) {
        ping = false;
        setTimeout(() => { ping = true }, 1000)
    }

    var message = new Discord.Message(client, null, channel);
    const valorant = message.guild.emojis.cache.find(emoji => emoji.name === 'Valorant');
    const siege = message.guild.emojis.cache.find(emoji => emoji.name === 'Siege');

    let text = 'Welcome to CEA ticket support. \n \n \nPlease select the most appropriate category regarding your inquiry by reacting to this message. \n1️⃣: General \n2️⃣: Valorant \n3️⃣: Siege';
    message.channel.send(text).then(async (sentmessage) => {
        const filter = (reaction, user) => {
            return reaction.emoji.name === '2️⃣' || '3️⃣';
        }

        var collector = sentmessage.createReactionCollector(filter)

        collector.on('collect', async (reaction, user) => {
            let roles = await message.guild.roles.fetch()
            const allowedRoles = ['Statistics', 'Rainbow Six League Admin', 'Valorant League Admin'];
            const rolemap = roles.cache.filter(role => allowedRoles.includes(role.name))
            switch (reaction.emoji.name) {
                case '2️⃣': //VALORANT
                    roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                    console.log(rolemap.get('586678103762272257'))
                    await message.channel.overwritePermissions([
                        {
                            id: rolemap.get('586678103762272257').id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: rolemap.get('509808982991568906').id, //REMOVE SIEGE ADMINS 509808982991568906
                            deny: ['VIEW_CHANNEL'],
                        },
                    ], 'Changed permissions');
                    console.log('post-if statement')
                    break;
                case '3️⃣': //SIEGE
                    roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                    console.log(rolemap.get('586678103762272257'))
                    await message.channel.overwritePermissions([
                        {
                            id: rolemap.get('586678103762272257').id, //586678103762272257
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: rolemap.get('741457872176676875').id, //REMOVE VAL ADMINS 741457872176676875
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
        //general inquiry = stats stays
        //509808982991568906 - siege admin
        // 741457872176676875 - val admin
        // 586678103762272257 - stat

        // THESE REACTIONS DO NOT SERVE ANY PURPOSE BESIDES IDENTIFICATION
        sentmessage.react('1️⃣');
        sentmessage.react('2️⃣');
        sentmessage.react('3️⃣');

        // reaction to message for role
        //add emojis for other reactions
    })
});


