const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login('NzI4NzExMDE2MTc0NTgzODA4.Xv-ZRA.WXUp-lzvg5lhbS-JuKPdaitBuag');

client.on("channelCreate", (channel) => { //method looks for channel

    var message = new Discord.Message(client, null, channel);
    // extract text into a separate variable

    let text = 'Thank you for opening a ticket. Please react with ' 'so that the ticket is labeled as such.'
    message.channel.send(text).then(async (sentmessage) => { //text would be what to prompt user with
        const filter = (reaction, user) => {

            // set up emojis to be filtered for categories
            return reaction.emoji.name === '🙂'
        }

        //console.log(channel.members);

        var collector = sentmessage.createReactionCollector(filter)

        // let myRole = message.guild.roles.find(role => role.name === "TEST ROLE");
        // console.log(myRole);

        collector.on('collect', async (reaction, user) => {
            // Possibly make this into a switch statement, maybe late

            switch (reaction.emoji.name) {
                case '🙂':
                    let roles = await message.guild.roles.fetch()
                    roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                    const allowedRoles = ['TEST ROLE'];
                    const rolemap = roles.cache.filter(role => allowedRoles.includes(role.name))
                    console.log(rolemap.get('733066904582881300')) //replace for actual id of role

                    await message.channel.overwritePermissions([
                        {
                            // id: rolemap.get('733066904582881300').id,
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
        sentmessage.react('🙂');
        const valorant = message.guild.emojis.cache.find(emoji => emoji.name === 'valorant');
        const siege = message.guild.emojis.cache.find(emoji => emoji.name === 'siege');
        sentmessage.react(valorant);
        sentmessage.react(siege)
        // reaction to message for role
        //add emojis for other reactions
    })
});


