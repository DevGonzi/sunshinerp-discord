const fs = require('fs');
const botData = JSON.parse(fs.readFileSync('./config.json'));
const log = require('./../handler/logging.js');

class EditOnlineChannel {
    static init(client) {
        this.doEdit(client);
        setInterval(() => {
            this.doEdit(client);
        }, 1000 * 60 * 10);
    }
    static doEdit(client) {
        const guild = client.guilds.cache.get(botData.guildId);
        // console.log(guild.memberCount);
        const userID = client.channels.cache.get(botData.channelEdit.user);
        const count = guild.members.cache.filter(omember => !omember.user.bot).size;

        // All User Count
        if (userID.name === `📈 Spieler: ${parseInt(count)}`) {
            log.log('no new User count!');
        } else {
            userID
                .setName(`📈 Spieler: ${parseInt(count)}`)
                .then(newChannel => log.log(`Neuer Channelname für den User Channel ist: ${newChannel.name}`))
                .catch(console.error);
        }
    }
}

module.exports = {
    EditOnlineChannel: EditOnlineChannel,
};
