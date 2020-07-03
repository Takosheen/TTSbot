const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login('NzI4NzExMDE2MTc0NTgzODA4.Xv-ZRA.WXUp-lzvg5lhbS-JuKPdaitBuag');

client.on("channelCreate", (channel) => { //method looks for channel 
    var message = new Discord.Message(client,null,channel);
    message.channel.send('text').then((sentmessage)=>{ //text would be what to prompt user with
        sentmessage.react('😀'); // reaction to message for role
    });
});
