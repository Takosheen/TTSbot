const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on("channelCreate", (channel) => { //method looks for channel

    var message = new Discord.Message(client, null, channel);
    // extract text into a separate variable

    const valorant = message.guild.emojis.cache.find(emoji => emoji.name === 'valorant');
    const siege = message.guild.emojis.cache.find(emoji => emoji.name === 'siege');

    let text = 'Welcome to CEA ticket support. \n \n \nPlease select the most appropriate category regarding your inquiry by reacting to this message. \n🗒️: General \n<:valorant:741007650262745139>: Valorant \n<:siege:741007641895239742>: Siege';
    message.channel.send(text).then(async (sentmessage) => { //text would be what to prompt user with
        const filter = (reaction, user) => {

            // set up emojis to be filtered for categories

            return reaction.emoji.name === '1️⃣' || '2️⃣'; // change these emojis if needed
        }

        //console.log(channel.members);

        var collector = sentmessage.createReactionCollector(filter)

        // let myRole = message.guild.roles.find(role => role.name === "TEST ROLE");
        // console.log(myRole);

        collector.on('collect', async (reaction, user) => {
            let roles = await message.guild.roles.fetch()
            const allowedRoles = ['fuckrole', 'fuckrole2'];
            const rolemap = roles.cache.filter(role => allowedRoles.includes(role.name))
            switch (reaction.emoji.name) {
                case '1️⃣':
                    roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                    console.log(rolemap.get('741406472101036094')) //replace for actual id of role
                    await message.channel.overwritePermissions([
                        {
                            id: rolemap.get('741406472101036094').id, //replace for actual id of role
                            deny: ['VIEW_CHANNEL'],
                        },
                    ], 'Changed permissions');
                    console.log('post-if statement')
                    break;
                case '2️⃣':
                    roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                    console.log(rolemap.get('741925856917848084')) //replace for actual id of role
                    await message.channel.overwritePermissions([
                        {
                            id: rolemap.get('741925856917848084').id, //replace for actual id of role
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
        //Roles - Stats - 586678103762272257
        //Production - 512431819400937496
        //add :notepad_spiral: for general inquiry -- done

        sentmessage.react('1️⃣');
        sentmessage.react('2️⃣')
        sentmessage.react('🗒️');
        sentmessage.react(valorant);
        sentmessage.react(siege);
        // reaction to message for role
        //add emojis for other reactions
    })
});


