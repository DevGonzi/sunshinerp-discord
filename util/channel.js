const fs = require('fs');
const botData = JSON.parse(fs.readFileSync('./config.json'));
const log = require('./../handler/logging.js');

class Channel {
    static editName(client, channelId, newName) {
        const channel = client.channels.cache.get(channelId);
        if (!channel) return log.error('Channel.editName | Channel undefined');
        channel
            .setName(newName)
            .then(newChannel => log.log(`Neuer Channelname für den Channel ${channel.name} ist: ${newChannel.name}`))
            .catch(console.error);
    }
}

module.exports = {
    Channel: Channel,
};
