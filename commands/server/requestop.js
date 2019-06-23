const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class requestopCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'requestop', 
      group: 'server',
      memberName: 'requestop',
      description: "Sends a message to the staff team when you need help"
    });
  }

  async run(message)
  {
    var requestopargs = message.content.slice(prefix.length).split(/ + /);
    var requestopmessage = requestopargs.join(" ").slice(10);
    var moderationlogs = message.guild.channels.find(`name`, "moderation-logs");
    if (!requestopmessage) return message.channel.send("Usage: .requestop <message>.");
    if (!moderationlogs) return message.channel.send("There isn't a channel called `#moderation-logs`.");
    moderationlogs.send({embed: new Discord.RichEmbed()
        .setTitle("**FrostedHost | RequestOP**")
        .setColor("#4286f4")
        .addField("✨ | User", "-> " + message.author.tag)
        .addField("💡 | Request", "-> " + requestopmessage)
        .setTimestamp()
        .setFooter("FrostedHost Bot | created by hieu#0843")})
    var messenger = message.member
    messenger.sendMessage("Thank you for sending a requestop message. We will respond within 24h; thanks for your patience.")
  }
}

module.exports = requestopCommand;
