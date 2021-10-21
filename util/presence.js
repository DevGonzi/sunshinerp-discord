const presences = require('./../config.json');
const log = require('./../handler/logging.js');

class Presence {
    static init(client) {
        this.setRndPresence(client);
        setInterval(() => {
            this.setRndPresence(client);
        }, 1000 * 60 * 5);
    }
    static setRndPresence(client) {
        client.user.setPresence({activities: [{name: presences.playings[Math.floor(Math.random() * presences.playings.length)]}], status: 'dnd'});
    }
}

module.exports = {
    Presence: Presence,
};
