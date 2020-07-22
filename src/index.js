const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login('NzI4NzExMDE2MTc0NTgzODA4.Xv-ZRA.WXUp-lzvg5lhbS-JuKPdaitBuag');

client.on("channelCreate", (channel) => { //method looks for channel
    
    var message = new Discord.Message(client,null,channel);
    
    // extract text into a separate variable
    message.channel.send('text').then(async (sentmessage)=>{ //text would be what to prompt user with
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
            if(reaction.emoji.name === '🙂') {
                let roles =  await message.guild.roles.fetch()
                roles.cache.forEach(Role => console.log(Role.name + ' ' + Role.id));
                const allowedRoles = ['TEST ROLE'];
                const rolemap = roles.cache.filter(role => allowedRoles.includes(role.name))
                console.log(rolemap.get('733066904582881300'))

                 await message.channel.overwritePermissions([
                     {
                        id: rolemap.get('733066904582881300').id,
                        deny: ['VIEW_CHANNEL'],
                     },
                   ], 'Needed to change permissions'); // change reasoning later
                    console.log('post-if statement')
            }
        })
        sentmessage.react('🙂'); // reaction to message for role
        //add emojis for other reactions
    });
});

