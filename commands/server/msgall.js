const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class msgallCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'msgall', 
      group: 'server',
      memberName: 'msgall',
      description: "Privately messages all members"
    });
  }

  async run(message)
  {
    var msgallargs = message.content.slice(prefix.length).split(/ + /);
    var msgallmsg = msgallargs.join(" ").slice(7);
    var managementrole = message.guild.roles.find(`name`, "Msgall Permission");
    var moderationlogs = message.guild.channels.find(`name`, "moderation-logs");
    if (!managementrole) return message.channel.send("There isn't a role called `Msgall Permission`.");
    if (!msgallmsg) return message.channel.send("Usage: .msgall <message>");
    if (!message.member.roles.has(managementrole.id)) return message.channel.send("No permission.").then(moderationlogs.send({embed: new Discord.RichEmbed()
        .setTitle("**FrostedHost | Violation**")
        .setColor("#FF0000")
        .addField("⚠️ | User", "-> " + message.author.tag)
        .addField("💬 | Execution Message", "->" + message.content)
        .addField("📺 | Channel Executed", "-> " + message.channel)
        .addField("⏰ | Time", "-> " + message.createdAt)
        .setTimestamp()
        .setFooter("FrostedHost Bot | created by hieu#0843")}));
    message.guild.members.forEach(member => {
        member.send({embed: new Discord.RichEmbed()
            .setTitle("**FrostedHost | Private Message**")
            .setColor("#4286f4")
            .addField(msgallmsg, "-> Management Team")}).then(moderationlogs.send({embed: new Discord.RichEmbed()
              .setTitle("**FrostedHost | MsgAll**")
              .setColor("#426f4")
              .addField("🔑 | Executor", message.author.tag)
              .addField("💬 | MsgAll Message", message.content)
              .setTimestamp()
              .setFooter("FrostedHost Bot | created by hieu#0843")}));
        });
  }
}

module.exports = msgallCommand;
