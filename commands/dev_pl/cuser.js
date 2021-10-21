const Discord = require('discord.js');
const {Permissions} = require('../../util/permissions.js');
const log = require('../../handler/logging.js');

module.exports.run = async (client, msg, args) => {
    if (!Permissions.entwickler(msg.member) && msg.guild.id != 743120412132507668) return;

    let add_rem = false;
    let VIEW_CHANNEL = false;
    let SEND_MESSAGES = false;
    let ADD_REACTIONS = false;
    let READ_MESSAGE_HISTORY = false;

    if (args[1] == 1) add_rem = true;
    if (args[2] == 1) VIEW_CHANNEL = true;
    if (args[3] == 1) SEND_MESSAGES = true;
    if (args[4] == 1) ADD_REACTIONS = true;
    if (args[5] == 1) READ_MESSAGE_HISTORY = true;

    const user = msg.mentions.users.first();

    if (!user || args.length != 6) {
        console.log('No user!', user);
        console.log('args.length', args.length);
        return msg.reply('Syntax: `!cuser <@user> add/rem VIEW_CHANNEL SEND_MESSAGES ADD_REACTIONS READ_MESSAGE_HISTORY`');
    } else {
        console.log(user);
    }

    if (VIEW_CHANNEL) msg.channel.updateOverwrite(user, {VIEW_CHANNEL: false, SEND_MESSAGES: false, ADD_REACTIONS: false, READ_MESSAGE_HISTORY: false}, `SunshineRP-Bot for ${msg.author.tag}`);
    else {
        msg.channel.permissionOverwrites.get(user.id).delete();
    }

    const embed = new Discord.MessageEmbed()
        .setTitle(`User ${add_rem ? 'zum' : 'vom'} Channel ${add_rem ? 'Hinzugefügt' : 'Entfernt'}!`)
        .setDescription(`${user} wurde ${add_rem ? 'zum' : 'vom'} Channel **${msg.channel.name}** ${add_rem ? 'Hinzugefügt' : 'Entfernt'}!`)
        .addField('VIEW_CHANNEL', VIEW_CHANNEL, false)
        .addField('SEND_MESSAGES', SEND_MESSAGES, false)
        .addField('ADD_REACTIONS', ADD_REACTIONS, false)
        .addField('READ_MESSAGE_HISTORY', READ_MESSAGE_HISTORY, false)
        .setFooter(msg.member.displayName, msg.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter(`User was added to this Channel by ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setTimestamp();
    msg.channel.send({embeds: [embed]});
};

module.exports.config = {
    name: 'cuser',
    aliases: [],
};
