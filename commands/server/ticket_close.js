const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class closeCommand extends commando.Command {
    constructor(client) 
    {
      super(client, {
        name: 'close', 
        group: 'server',
        memberName: 'close',
        description: "Closes a support ticket"
      });
    }

    async run(message, args)
    {
    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`.confirm\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '.confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
    }
}

module.exports = closeCommand;
