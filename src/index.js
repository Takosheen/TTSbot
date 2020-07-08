const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login('NzI4NzExMDE2MTc0NTgzODA4.Xv-ZRA.WXUp-lzvg5lhbS-JuKPdaitBuag');

client.on("channelCreate", (channel) => { //method looks for channel
    
    var message = new Discord.Message(client,null,channel);
    
    // extract text into a separate variable
    message.channel.send('text').then((sentmessage)=>{ //text would be what to prompt user with
        const filter = (reaction, user) => {
            
            // set up emojis to be filtered for categories
          return reaction.emoji.name === '🙂'
        }
    
        var collector = sentmessage.createReactionCollector(filter)
        
        collector.on('collect', (reaction, user) => {
            // Possibly make this into a switch statement, maybe later
            if(reaction.emoji.name === '🙂')
               
        })
        sentmessage.react('🙂'); // reaction to message for role
        //add emojis for other reactions
    });
});

