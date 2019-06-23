const commando = require('discord.js-commando')
const Discord = require('discord.js');
const prefix = ".";
const bot = new commando.Client({
    commandPrefix: prefix,
    unknownCommandResponse: false
});

bot.login(process.env.token);

bot.on('ready',function(){
    console.log(`Bot is now online!, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(`FrostedHost | frostedhost.com`, { type: 'WATCHING' });
});

bot.registry.registerGroup('server', 'Server')
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.registry.registerDefaults();

bot.on('guildMemberAdd', (member) => {
    const welcomechannel = member.guild.channels.find('name', `welcome`);
    welcomechannel.send({embed: new Discord.RichEmbed()
        .setColor("#4286f4")
        .setTitle("**New Member**")
        .setDescription(`:busts_in_silhouette: | **Greetings,** ${member}. Welcome to the **FrostedHost Discord Network**.`)});
})

bot.on('guildMemberRemove', (member) => {
    const welcomechannel = member.guild.channels.find('name', `moderation-logs`);
    welcomechannel.send({embed: new Discord.RichEmbed()
        .setColor("#4286f4")
        .setTitle("**Leave Member**")
        .setDescription(`:busts_in_silhouette: | **Goodbye,** ${member}. Thanks for being here in the **FrostedHost Discord Network**.`)});
})

