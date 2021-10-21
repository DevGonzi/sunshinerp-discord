// Invite Link: https://discord.com/oauth2/authorize?client_id=862313456475832350&scope=bot

// require modules and files
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']});

const log = require('./handler/logging.js');

const botConfig = JSON.parse(fs.readFileSync('./bot.json'));
const config = JSON.parse(fs.readFileSync('./config.json'));
let isDev = false;

client.on('ready', ready);

function ready() {
    log.log(`Verbunden als ${client.user.tag}`);

    client.channels.cache
        .get('891618901924937748')
        .messages.fetch({limit: 25})
        .then(messages => {
            messages.forEach(m => {
                console.log(m.author.tag, m.content);
            });
        });
}

// Log errors
process.on('uncaughtException', error => log.error(error));

// Login into the bot via config defined token
client.login(botConfig.token);
