const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class muteCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'mute', 
      group: 'server',
      memberName: 'mute',
      description: "Mutes a user"
    });
  }

  async run(message)
  {
    var muteargs = message.content.slice(prefix.length).split(/ + /);
    var mutemember = message.guild.member(message.mentions.users.first());
    var mutereason = muteargs.join(" ").slice(26);
    var muterole = message.guild.roles.find(`name`, "Muted");
    var staffrole = message.guild.roles.find(`name`, "♕ | Staff Team");
    var moderationlogs = message.guild.channels.find(`name`, "moderation-logs");
    if (!muterole) return message.channel.send("There isn't a role called `Muted`.");
    if (!mutemember) return message.channel.send("Usage: .mute <user> <reason>.");
    if (!mutereason) return message.channel.send("Usage: .mute <user> <reason>.");
    if (!staffrole) return message.channel.send("There isn't a role called `♕ | Staff Team`.");
    if (mutemember.roles.has(muterole.id)) return message.channel.send("That user has already been muted");
    if (!moderationlogs) return message.channel.send("There isn't a channel called `#moderation-logs`.");
    if (!message.member.roles.has(staffrole.id)) return message.channel.send("No permission.").then(moderationlogs.send({embed: new Discord.RichEmbed()
    .setTitle("**FrostedHost | Violation**")
    .setColor("#FF0000")
    .addField("⚠️ | User", "-> " + message.author.tag)
    .addField("💬 | Execution Message", "->" + message.content)
    .addField("📺 | Channel Executed", "-> " + message.channel)
    .addField("⏰ | Time", "-> " + message.createdAt)
    .setTimestamp()
    .setFooter("FrostedHost Bot | created by hieu#0843")}));
    if (mutemember.roles.has(staffrole.id)) return message.channel.send("That user is a staff member.").then(moderationlogs.send({embed: new Discord.RichEmbed()
    .setTitle("**FrostedHost | Violation**")
    .setColor("#FF0000")
    .addField("⚠️ | User", "-> " + message.author.tag)
    .addField("💬 | Execution Message", "->" + message.content)
    .addField("📺 | Channel Executed", "-> " + message.channel)
    .addField("⏰ | Time", "-> " + message.createdAt)
    .setTimestamp()
    .setFooter("FrostedHost Bot | created by hieu#0843")}));
    moderationlogs.send({embed: new Discord.RichEmbed()
    .setTitle("**FrostedHost | Mute**")
    .setColor("#4286f4")
    .addField("🔴 | Executor", "-> " + message.author.tag)
    .addField("🏹 | Target", "-> " + mutemember.author.tag)
    .addField("☀️ | Reason", "-> " + mutereason)
    .setTimestamp()
    .setFooter("FrostedHost Bot | created by hieu#0843")}).then(mutemember.addRole(muterole.id));
    message.channel.send(mutemember + " has been muted.");
    mutemember.sendMessage("You have been muted from the **__FrostedHost Network__** for the reason of | " + mutereason + ".");
  }
}

module.exports = muteCommand;
