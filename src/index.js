const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});
//const BOT_TOKEN = process.env.6euOTfx9ob - 2dEuEtzQxT2HQnH6hZcHL;
client.login('tzxwjCEu1fvet6ANPfdFc9rU5lJ8XqtD');

client.on("channelCreate", (channel) => { //method looks for channel

    var message = new Discord.Message(client, null, channel);
    // extract text into a separate variable

    let text = 'sample text'
    message.channel.send(text).then(async (sentmessage) => { //text would be what to prompt user with
        const filter = (reaction, user) => {

            // set up emojis to be filtered for categories
            return reaction.emoji.name === '1️⃣' // change these emojis if needed
        }

        //console.log(channel.members);

        var collector = sentmessage.createReactionCollector(filter)

        // let myRole = message.guild.roles.find(role => role.name === "TEST ROLE");
        // console.log(myRole);

        collector.on('collect', async (reaction, user) => {

            switch (reaction.emoji.name) {
                case '1️⃣':
                    let roles = await message.guild.roles.fetch()
                    roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                    const allowedRoles = ['fuckrole'];
                    const rolemap = roles.cache.filter(role => allowedRoles.includes(role.name))
                    console.log(rolemap.get('741406472101036094')) //replace for actual id of role

                    await message.channel.overwritePermissions([
                        {
                            id: rolemap.get('741406472101036094').id, //replace for actual id of role
                            deny: ['VIEW_CHANNEL'],
                        },
                    ], 'Changed permissions');
                    console.log('post-if statement')
                    break;
                /* case '2️⃣':
                     let roles = await message.guild.roles.fetch()
                     roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                     const allowedRoles = ['fuckrole'];
                     const rolemap = roles.cache.filter(role => allowedRoles.includes(role.name))
                     console.log(rolemap.get('741406472101036094')) //replace for actual id of role
 
                     await message.channel.overwritePermissions([
                         {
                             id: rolemap.get('741406472101036094').id, //replace for actual id of role
                             deny: ['VIEW_CHANNEL'],
                         },
                     ], 'Changed permissions');
                     console.log('post-if statement')
                     break;*/
                default:
                    console.log('No reaction');
                    break;
            }

        })
        //Roles - Stats - 586678103762272257
        //Production - 512431819400937496
        //add :notepad_spiral: for general inquiry -- done
        const valorant = message.guild.emojis.cache.find(emoji => emoji.name === 'valorant');
        const siege = message.guild.emojis.cache.find(emoji => emoji.name === 'siege');

        sentmessage.react('1️⃣');
        sentmessage.react('2️⃣')
        sentmessage.react('🗒️');
        sentmessage.react(valorant);
        sentmessage.react(siege);
        // reaction to message for role
        //add emojis for other reactions
    })
});


