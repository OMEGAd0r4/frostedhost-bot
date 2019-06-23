const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class announceCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'announce', 
      group: 'server',
      memberName: 'announce',
      description: "Makes an announcement"
    });
  }

  async run(message)
  {
    var announcementargs = message.content.slice(prefix.length).split(/ + /);

    var announcementmessage = announcementargs.join(" ").slice(9);

    var announceperm = message.guild.roles.find(`name`, "Announcement Permission");

    var announcementchannel = message.guild.channels.find(`name`, "announcement");

    if (!announceperm) return message.channel.send("There isn't a role called *Announcement Permission*.");

    if (!message.member.roles.has(announceperm.id)) return message.channel.send("No Permission.");

    announcementchannel.send({embed: new Discord.RichEmbed()
    .setTitle("**FrostedHost | Announcement**")
    .setColor("#4286f4")
    .addField(announcementmessage, "-> Management Team")
    .setFooter("FrostedHost Bot | created by hieu#0843")})

    announcementchannel.send('@everyone')
  .then(msg => {
    msg.delete(1000)
  })
  .catch();
  }
}

module.exports = announceCommand;
