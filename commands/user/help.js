const Discord = require('discord.js');
const config = require('../../bot.json');
const {Permissions} = require('./../../util/permissions.js');

const isDev = config.isDev;
const prefix = config.prefix;

module.exports.run = async (client, msg, args) => {
    // ToDo: correct cmd with commands for the rank
    if (!Permissions.entwickler(msg.member) && !isDev) return;
    const helpEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}'s commands`)
        .setDescription(`**Alle Commands:**`)
        .addField(`\`botinfo\``, `Infos über den Bot & Server.`)
        // .addField(`\`fir\``, `**Syntax: ${prefix}fir`)
        // .addField(`\`cinfo\``, `**Syntax:** ${prefix}cinfo \`[Vorname] [Nachname\`\n${prefix}cinfo \`[gid]\``)
        // .addField(`\`fbag\``, `**Syntax:** ${prefix}fbag \`[bagId]\``)
        .addField(`\`cleanup\``, `**Syntax:** ${prefix}cleanup \`[1-100]\``);
    msg.channel.send({embeds: [helpEmbed]});
};

module.exports.config = {
    name: 'help',
    aliases: ['bothelp'],
};
