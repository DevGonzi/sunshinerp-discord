const Discord = require('discord.js');
const {Permissions} = require('../../util/permissions.js');
const log = require('../../handler/logging.js');

module.exports.run = async (client, msg, count) => {
    if (!Permissions.entwickler(msg.member)) return; // no perm
    count = parseInt(count);

    if (isNaN(count)) count = 0;

    if (count >= 100) count = 100;

    msg.delete();
    msg.channel
        .bulkDelete(count)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(log.error);
};

module.exports.config = {
    name: 'cleanup',
    aliases: ['cleanUp'],
};
