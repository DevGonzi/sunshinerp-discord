const nodeFetch = require('node-fetch');
const fs = require('fs');
const botData = JSON.parse(fs.readFileSync('./config.json'));
const log = require('../handler/logging.js');
const {Channel} = require('./channel.js');
const {Permissions} = require('./permissions.js');

class InternalStats {
    static init(client) {
        // Run once on init
        this.setOnlinePlayers(client);
        this.staffOnline(client);

        // run all 5 minits
        setInterval(() => {
            this.setOnlinePlayers(client);
        }, 1000 * 60 * 5);

        setInterval(() => {
            this.staffOnline(client);
        }, 1000 * 60 * 100);
    }

    /**
     *
     * @param {discordClient} client The bot himself
     */
    static setOnlinePlayers = async function (client) {
        let currData = await this.fetchPlayers(botData.serverStatus.serverId);
        if (!currData.active) return Channel.editName(client, botData.serverStatus.serverOnlinePlayers, '❌ SERVER OFFLINE! ❌');
        const currPly = currData.info.players;
        log.log(`currPly: ${currPly} - active: ${currData.active}`);
        if (currPly && currData.active) Channel.editName(client, botData.serverStatus.serverOnlinePlayers, `💻 Spieler Ingame: ${currPly}`);
    };

    static staffOnline(client) {
        const guild = client.guilds.cache.get(botData.guildId);
        const staffOnline = guild.members.cache.filter(
            omember => (omember.presence.status === 'online' && !omember.user.bot && Permissions.allTeam(omember)) || (omember.presence.status === 'dnd' && !omember.user.bot && Permissions.allTeam(omember)) || (omember.presence.status === 'idle' && !omember.user.bot && Permissions.allTeam(omember))
        ).size;
        if (staffOnline >= 1) Channel.editName(client, botData.serverStatus.staffOnline, `🤪 Team Online: ${staffOnline}`);
        else Channel.editName(client, botData.serverStatus.staffOnline, 'Keiner Online 😥');
    }

    /**
     * @param {number} serverID The Server ID (from alt:V masterlist)
     */
    static fetchPlayers = async function (serverId) {
        if (!serverId) return log.error('Missing arg: serverId');
        let url = `https://api.altv.mp/server/${serverId}`;
        return new Promise((accept, reject) => {
            nodeFetch(url, {method: 'Get'})
                .then(res => res.json())
                .then(json => {
                    accept(json);
                });
        });
    };
}

const int = new InternalStats();

module.exports = {
    InternalStats: InternalStats,
};
