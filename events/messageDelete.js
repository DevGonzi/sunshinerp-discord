const Discord = require('discord.js');
const fs = require('fs');

// load bot config.json file and parse data
const botData = JSON.parse(fs.readFileSync('./config.json'));

const logChannelId = botData.channels.logChannelId;

module.exports = async (client, msg) => {
    const logs = await msg.guild.fetchAuditLogs({type: 72});
    const entry = logs.entries.first();

    if (!msg.author) return; // Return if not author

    if (entry.executor.bot) return;
    // if (msg.author.bot) return; // Bot
    if (!msg.content) return;

    if (msg.content.startsWith('!cinfo')) return;
    if (msg.channel.id === logChannelId) return; // logchannel

    const embed = new Discord.MessageEmbed()
        .setTitle('**Nachricht Gelöscht**')
        .setColor('#fc3c3c')
        .addField('Autor', msg.author, true)
        .addField('Channel', msg.channel, true)
        .addField('Gelöcht von (buggy!!!)', entry.executor, true)
        .addField('Nachricht', msg.content)
        // .addField("Grund", entry.reason || "Unspecified")
        .setFooter(`Message ID: ${msg.id} | Author ID: ${msg.author.id}`);

    const channel = msg.guild.channels.cache.find(ch => ch.id == logChannelId);
    if (!channel) return console.log('channel not found');
    channel.send({embeds: [embed]});
};
