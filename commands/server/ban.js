const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class banCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'ban', 
      group: 'server',
      memberName: 'ban',
      description: "Bans a user"
    });
  }

  async run(message)
  {
    var banargs = message.content.slice(prefix.length).split(/ + /);
    var banuser = message.guild.member(message.mentions.users.first());
    var banreason = banargs.join(" ").slice(25);
    var staffrole = message.guild.roles.find(`name`, "♕ | Staff Team");
    var moderationlogs = message.guild.channels.find(`name`, "moderation-logs");
    if (!message.member.roles.has(staffrole.id)) return message.channel.send("No permission.").then(moderationlogs.send({embed: new Discord.RichEmbed()
        .setTitle("**FrostedHost | Violation**")
        .setColor("#FF0000")
        .addField("⚠️ | User", "-> " + message.author.tag)
        .addField("💬 | Execution Message", "->" + message.content)
        .addField("📺 | Channel Executed", "-> " + message.channel)
        .addField("⏰ | Time", "-> " + message.createdAt)
        .setTimestamp()
        .setFooter("FrostedHost Bot | created by hieu#0843")}));
    if (!staffrole) return message.channel.send("There isn't a role called `♕ | Staff Team`.");
    if (!moderationlogs) return message.channel.send("There isn't a channel called `#moderation-logs`.");
    if (!banuser) return message.channel.send("Usage: .ban <user> <reason>.");
    if (!banreason) return message.channel.send("Usage: .ban <user> <reason>.");
    moderationlogs.send({embed: new Discord.RichEmbed()
        .setTitle("**FrostedHost | Ban**")
        .setColor("#4286f4")
        .addField("🔴 | Executor", "-> " + message.author.tag)
        .addField("🏹 | Target", "-> " + banuser.author.tag)
        .addField("☀️ | Reason", "-> " + banreason)
        .setTimestamp()
        .setFooter("FrostedHost Bot | created by hieu#0843")}).then(banuser.ban(banreason));
    message.channel.send(banuser + "has been banned.");
    banuser.sendMessage("You have been banned from the **__FrostedHost Network__** for the reason of | " + banreason);
  }
}

module.exports = banCommand;
