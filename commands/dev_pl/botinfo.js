const Discord = require('discord.js');
const os = require('os');
const {Permissions} = require('./../../util/permissions.js');

String.prototype.toHHMMSS = function () {
    const sec_num = parseInt(this, 10); // don't forget the second param
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - hours * 3600) / 60);
    const seconds = sec_num - hours * 3600 - minutes * 60;
    const time = hours + ':' + minutes + ':' + seconds;
    return time;
};

module.exports.run = async (client, msg, args) => {
    if (!Permissions.entwickler(msg.member)) return;
    const t = (process.uptime() + '').toHHMMSS().split(':');
    const embed = new Discord.MessageEmbed()
        // .setThumbnail(client.user.displayAvatarURL())
        .setTitle('Bot Stats')
        .setColor('#000000')
        .addFields(
            {
                name: '🌐 Servers',
                value: `Serving ${client.guilds.cache.size} servers.`,
                inline: false,
            },
            {
                name: '📺 Channels',
                value: `Serving ${client.channels.cache.size} channels.`,
                inline: false,
            },
            {
                name: '👥 Server Users',
                value: `Serving ${client.users.cache.size}`,
                inline: false,
            },
            {
                name: '⏳ Ping',
                value: `${Math.round(client.ws.ping)}ms`,
                inline: false,
            },
            {
                name: 'Uptime',
                value: `Der Bot läuft seit ${t[0]} Stunden, ${t[1]} Minuten und ${t[2]} Sekunden!`,
                inline: false,
            },
            {
                name: 'Server Info',
                value: `Cores: ${os.cpus().length}`,
                inline: false,
            }
        )
        .setFooter(`Created By: ${msg.author.tag}`, msg.author.displayAvatarURL());

    msg.channel.send({embeds: [embed]});

    if (msg != undefined) msg.delete({timeout: 1500});
};

module.exports.config = {
    name: 'botinfo',
    aliases: [],
};
