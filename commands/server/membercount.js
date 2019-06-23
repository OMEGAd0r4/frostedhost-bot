const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class membercountCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'membercount', 
      group: 'server',
      memberName: 'membercount',
      description: "Displays the member count for the server"
    });
  }

  async run(message)
  {
    message.channel.send({embed: new Discord.RichEmbed()
        .setTitle("**FrostedHost | Members Count**")
        .setColor("#4286f4")
        .addField("✅ | Online Count", "-> " + message.guild.members.filter(member => member.presence.status === 'online').size)
        .addField("👥 | Member Count", "-> " + message.guild.memberCount)
        .addField("🤖 | Bot Count", "-> " + message.guild.members.filter(member => member.user.bot).size)
        .setTimestamp()
        .setFooter("FrostedHost Bot | created by hieu#0843")});
  }
}

module.exports = membercountCommand;
