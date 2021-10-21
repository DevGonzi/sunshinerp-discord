const Discord = require('discord.js');
const log = require('../../handler/logging.js');
const {Permissions} = require('../../util/permissions.js');

module.exports.run = async (client, msg, args) => {
    if (Permissions.entwickler(msg.member)) {
        const text = args.join(' ');
        log.log(`User ${msg.author.tag} send ${text} to ${msg.channel.name}`);
        msg.channel.send(text);
        msg.delete({timeout: 500});
    }
};

module.exports.config = {
    name: 'sayh',
    aliases: [],
};
