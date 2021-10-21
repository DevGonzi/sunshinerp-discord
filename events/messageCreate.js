const fs = require('fs');

// eslint-disable-next-line node/no-unpublished-require
const btcfg = require('../bot.json');
const cfg = JSON.parse(fs.readFileSync('./config.json'));

const isDev = btcfg.isDev;
const devPermOverwrite = btcfg.devPermOverwrite;

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    if (message.channel.type == 'dm') {
        console.log(`[DM]
			UserTag: ${message.author.tag}
			UserID: ${message.author.id}
			Nachricht: ${message.content}`);
    }

    const args = message.content.split(/\s+/g);
    const command = message.content.startsWith(btcfg.prefix) && args.shift().slice(btcfg.prefix.length).toLowerCase();

    if (command) {
        const commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        // only allow devPermOverwrite
        if (isDev && devPermOverwrite && message.guild.id != 743120412132507668) return;
        if (commandfile) commandfile.run(client, message, args);
    }

    // // Sort Role
    // if (msg.member.roles.cache.some(r => ['742791318778019881', '742791497342124092', '742998808472059925', '742845770549428234'].includes(r.id))) {
    //     // Team
    //     let teamRole = msg.guild.roles.cache.find(r => r.id == '742837268125057155');
    //     if (!msg.member.roles.cache.has(teamRole.id)) {
    //         msg.member.roles.add(teamRole).catch(console.error);
    //         log.console(`Add Team Role to ${msg.author.tag}`);
    //     }
    // }
    // if (msg.member.roles.cache.some(r => ['744330012114812978', '744503245061357600', '744503245061357600', '744558546116411413', '746062873687621703', '745208395946000395'].includes(r.id))) {
    //     // Extra
    //     let extraRole = msg.guild.roles.cache.find(r => r.id == '743244373092990988');
    //     if (!msg.member.roles.cache.has(extraRole.id)) {
    //         msg.member.roles.add(extraRole).catch(console.error);
    //         log.console(`Add Extra Role to ${msg.author.tag}`);
    //     }
    // }
    // if (msg.member.roles.cache.some(r => ['743926928624320683', '743926973499441325', '743930146251341994', '743930145584316466'].includes(r.id))) {
    //     // Level
    //     let standardRole = msg.guild.roles.cache.find(r => r.id == '743926796344492122');
    //     if (!msg.member.roles.cache.has(standardRole.id)) {
    //         msg.member.roles.add(standardRole).catch(console.error);
    //         log.console(`Add Level Role to ${msg.author.tag}`);
    //     }
    // }
    // if (msg.member.roles.cache.some(r => ['743991318874947585', '746755819844009985', '747432668815425538'].includes(r.id))) {
    //     // Farben
    //     let colorRole = msg.guild.roles.cache.find(r => r.id == '747012858910343240');
    //     if (!msg.member.roles.cache.has(colorRole.id)) {
    //         msg.member.roles.add(colorRole).catch(console.error);
    //         log.console(`Add Color Role to ${msg.author.tag}`);
    //     }
    // }
};
