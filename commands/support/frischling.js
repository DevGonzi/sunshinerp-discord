const {Permissions} = require('../../util/permissions.js');
const log = require('../../handler/logging.js');

module.exports.run = async (client, msg, args) => {
    if (Permissions.allTeam(msg.member)) {
        const user = getUserFromMention(args[0]);
        const role = msg.member.guild.roles.cache.find(role => role.id == '888886177451610142');
        user.roles.add(role);
    }
};

module.exports.config = {
    name: 'frischling',
    aliases: ['frl'],
};

function getUserFromMention(mention) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return client.users.cache.get(id);
}
