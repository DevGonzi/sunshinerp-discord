// at the top of your file
const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');

module.exports.run = async (client, msg, args) => {
    console.log('test');
    const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields({name: 'Regular field title', value: 'Some value here'}, {name: '\u200B', value: '\u200B'}, {name: 'Inline field title', value: 'Some value here', inline: true}, {name: 'Inline field title', value: 'Some value here', inline: true})
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

    msg.channel.send({embeds: [exampleEmbed]});
};

module.exports.config = {
    name: 'embed',
    aliases: [],
};
