const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class unmuteCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'unmute', 
      group: 'server',
      memberName: 'unmute',
      description: "Unmutes a user"
    });
  }

  async run(message)
  {
    var unmutemember = message.guild.member(message.mentions.users.first());
    var unmuterole = message.guild.roles.find(`name`, "Muted");
    var staffrole = message.guild.roles.find(`name`, "♕ | Staff Team");
    if (!unmutemember.roles.has(unmuterole.id)) return message.channel.send("That user isn't muted.");
    if (!message.member.roles.has(staffrole.id)) return message.channel.send("No permission.");
    var moderationlogs = message.guild.channels.find(`name`, "moderation-logs");
    if (!moderationlogs) return message.channel.send("There isn't a channel called `#moderation-logs`.");
    moderationlogs.send({embed: new Discord.RichEmbed()
    .setTitle("**FrostedHost | Unmute**")
    .setColor("#4286f4")
    .addField("🔵 | Executor", "-> " + message.author.tag)
    .addField("🏹 | Target", "-> " + unmutemember.author.tag)}).then(unmutemember.removeRole(unmuterole.id));
    if (!message.member.roles.has(staffrole.id)) return message.channel.send("No permission.").then(moderationlogs.send({embed: new Discord.RichEmbed()
        .setTitle("**FrostedHost | Violation**")
        .setColor("#FF0000")
        .addField("⚠️ | User", "-> " + message.author.tag)
        .addField("💬 | Execution Message", "->" + message.content)
        .addField("📺 | Channel Executed", "-> " + message.channel)
        .addField("⏰ | Time", "-> " + message.createdAt)
        .setTimestamp()
        .setFooter("FrostedHost Bot | created by hieu#0843")}));
    if (unmutemember.roles.has(staffrole.id)) return message.channel.send("That user is a staff member.").then(moderationlogs.send({embed: new Discord.RichEmbed()
        .setTitle("**FrostedHost | Violation**")
        .setColor("#FF0000")
        .addField("⚠️ | User", "-> " + message.author.tag)
        .addField("💬 | Execution Message", "->" + message.content)
        .addField("📺 | Channel Executed", "-> " + message.channel)
        .addField("⏰ | Time", "-> " + message.createdAt)
        .setTimestamp()
        .setFooter("FrostedHost Bot | created by hieu#0843")}));
    message.channel.send(unmutemember + " has been unmuted.");
    unmutemember.sendMessage("You have been muted from the **__FrostedHost Network__**");
  }
}

module.exports = unmuteCommand;
