const {Permissions} = require('../../util/permissions.js');
const log = require('../../handler/logging.js');

module.exports.run = async (client, msg, args) => {
    if (Permissions.allTeam(msg.member)) {
        msg.channel.send('https://fir.sona-rp.de');
        log.log(`${msg.author.tag} used !fir`);
        msg.delete({timeout: 10});
    }
};

module.exports.config = {
    name: 'fir',
    aliases: ['findsicraus'],
};
