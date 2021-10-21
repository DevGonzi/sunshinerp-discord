const Discord = require('discord.js');
const {Permissions} = require('../../util/permissions.js');
const log = require('../../handler/logging.js');

module.exports.run = async (client, msg, ...args) => {
    if (!Permissions.entwickler(msg.member)) return;

    if (args.length < 2) {
        return msg.reply('Syntax: `!ban <@user> <Grund>`');
    }

    const user = getUserFromMention(args[0]);
    if (!user) {
        return msg.reply('Syntax: `!ban <@user> <Grund>`');
    }
    console.log('test1');
    const reason = args.slice(1).join(' ');
    console.log('reason', reason);
    /*

    try {
        await msg.guild.members.ban(user, {reason});
    } catch (error) {
        return msg.channel.send(`Fehler beim Bannen von **${user.tag}**: ${error}`);
    }

    return msg.channel.send(`Hegel **${user.tag}** wurde beseitigt!`);
    */
};

module.exports.config = {
    name: 'ban',
    aliases: [],
};

function getUserFromMention(mention) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return client.users.cache.get(id);
}
