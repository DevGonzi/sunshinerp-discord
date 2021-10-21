const Discord = require('discord.js');
const log = require('../../handler/logging.js');
const {Permissions} = require('../../util/permissions.js');

const errCodeList = [];

errCodeList.push({
    errCode: 'Connect#001',
    result: 'Discord-Verifizierung Fehlgeschlagen.\nErneut versuchen - alternativ im Browser Discord ab- und anmelden',
    frontOrBack: 'Backend',
});
errCodeList.push({
    errCode: 'Connect#002',
    result: 'Der Discord-account des Useres ist nicht Verifiziert (z.B. Email nicht bestätigt)',
    frontOrBack: 'Backend',
});

module.exports.run = async (client, msg, args) => {
    const res = errCodeList.find(i => i.errCode == args[0]);

    var resultEmbed;

    if (res)
        resultEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Fehlercode abfrage von ${msg.author.tag}`)
            .setAuthor('SunshineRP Dev-Team (Backend Script)', 'https://cdn.discordapp.com/icons/786345539909451818/a_d0a3ff9f2a7600c13d6569f6711c9e73.png?size=4096')
            .addFields({name: `Fehlercode: ${args[0]}`, value: `${res.result}`})
            .setTimestamp()
            .setFooter('Bitte die Entwickler NICHT Privat anschreiben - Danke', 'https://cdn.discordapp.com/icons/786345539909451818/a_d0a3ff9f2a7600c13d6569f6711c9e73.png?size=4096');
    else {
        resultEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Es wurde kein Fehlercode gefunden!`)
            .setAuthor('SunshineRP Dev-Team (Backend Script)', 'https://cdn.discordapp.com/icons/786345539909451818/a_d0a3ff9f2a7600c13d6569f6711c9e73.png?size=4096')
            .setTimestamp()
            .setFooter('Bitte die Entwickler NICHT Privat anschreiben - Danke', 'https://cdn.discordapp.com/icons/786345539909451818/a_d0a3ff9f2a7600c13d6569f6711c9e73.png?size=4096');
    }

    msg.channel.send({embeds: [resultEmbed]});
};

module.exports.config = {
    name: 'errc',
    aliases: [],
};
