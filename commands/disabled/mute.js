const Discord = require('discord.js');
const {Permissions} = require('../../util/permissions.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    aliases: [],
    description: 'Muted einen User für eine Zeit von X',

    async run(client, message, args) {
        if (!Permissions.entwickler(message.member)) return;
        const muteRole = message.guild.roles.cache.get('804624510413438997');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send('Tagge einen User oder gib die ID an!');
        if (member == message.member) return message.channel.send('Bist du blöd? du kannst dich nicht selbst muten!');
        if (member == message.guild.me) return message.channel.send(message, 0, 'Das geht net du Hegel!');
        if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Dat jeht net!');
        if (!args[1]) return message.channel.send('Gib einen Zeitraum von 14 Tagen oder weniger an (1s/m/h/d)!');
        let time = ms(args[1]);
        if (!time || time > 1209600000)
            // Cap at 14 days, larger than 24.8 days causes integer overflow
            return message.channel.send('Gib einen Zeitraum von 14 Tagen oder weniger an (1s/m/h/d)');

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`Kein Grund angegeben`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if (member.roles.cache.has(muteRole)) return message.channel.send('Der Spieler ist bereits gemuted');

        // Mute member
        try {
            await member.roles.add(muteRole);
        } catch (err) {
            console.log(err);
            return message.channel.send('Der Bot konnte den User nicht Muten (Role Hirachy)', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle('Mute Member')
            .setDescription(`${member} wurde für **${ms(time, {long: true})}** Gemuted!.`)
            .addField('Moderator', message.member, true)
            .addField('Member', member, true)
            .addField('Zeit', `\`${ms(time)}\``, true)
            .addField('Grund', reason)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        message.channel.send(muteEmbed);

        // Unmute member
        member.timeout = message.client.setTimeout(async () => {
            try {
                await member.roles.remove(muteRole);
                const unmuteEmbed = new MessageEmbed().setTitle('Member Entmuted').setDescription(`${member} wured entmuted.`).setTimestamp().setColor(message.guild.me.displayHexColor);
                message.channel.send(unmuteEmbed);
            } catch (err) {
                console.log(err);
                return message.channel.send('Der Bot konnte den User nicht Muten (Role Hirachy)', err.message);
            }
        }, time);
    },
};

module.exports.config = {
    name: 'mute',
    aliases: [],
};
