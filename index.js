// Invite Link: https://discord.com/oauth2/authorize?client_id=862313456475832350&scope=bot

// require modules and files
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']});

const log = require('./handler/logging.js');

// const {Update} = require('./util/update.js');
// const {Presence} = require('./util/presence.js');
const {EditOnlineChannel} = require('./util/editOnlineChannel.js');
// const {InternalStats} = require('./util/internalStats.js');

// load bot config.json file and parse data
const botConfig = JSON.parse(fs.readFileSync('./bot.json'));
const config = JSON.parse(fs.readFileSync('./config.json'));
let isDev = false;

// Set to dev if config tells is youre running dev - MUST be false on Production
if (botConfig.isDev) {
    isDev = true;
    console.log('\n\nBOT IS NOW IN DEV MODE!\n\n');
}

// bot is connected to discord api
client.on('ready', ready);

client.on('guildMemberAdd', member => {
    // const emoji = client.emojis.cache.get('811656057185107978');
    // const embed = new Discord.MessageEmbed()
    //     .setTitle(`Willkommen ${member.user.tag}!`)
    //     .setDescription(`${member} hat sich zu uns gesellt!`)
    //     .setAuthor('SunshineRP Team', 'https://cdn.discordapp.com/icons/786345539909451818/a_d0a3ff9f2a7600c13d6569f6711c9e73.gif?size=4096', 'https://central-citylife.de/')
    //     .setThumbnail(member.user.displayAvatarURL())
    //     .addField(`Das SunshineRP Team wünscht dir viel Spaß! ${emoji}`, '\u200B', false)
    //     .setTimestamp();
    // client.channels.cache.get(config.channels.welcomeChannelId).send({embeds: [embed]});
});

client.on('guildMemberRemove', member => {
    // client.channels.cache.get('595965025517043722').send(`${member} hat uns verlassen...`);
});

// ready function, client event
function ready() {
    log.log(`Verbunden als ${client.user.tag}`);

    if (isDev) client.users.cache.get('321373026488811520').send('Bot Gestartet!'); // Msg an Gonzi xD

    try {
        // client.user.setPresence({activities: [{name: 'Bot is starting ...'}], status: 'dnd'});
    } catch (error) {
        log.error(error);
    }

    // Start all the Utils
    // InternalStats.init(client);
    EditOnlineChannel.init(client);
    // Presence.init(client);
    // if (!isDev) Update.init(client);

    // if (!botConfig.isDev) {
    //     const waschanlage = client.channels.cache.get(config.channels.waschanlageId);
    //     waschanlage.bulkDelete(100);
    //     waschanlage.send('I am Iron Man');
    // }
}

// event loader - load all events from dir "events"
fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    const jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0) {
        return log.error('Keine Events vorhanden!');
    }
    jsfile.forEach(file => {
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    });
});

const commands = ['user', 'support', 'team', 'dev_pl'];
commands.forEach(c => {
    // command loader
    fs.readdir(`./commands/${c}/`, (err, files) => {
        if (err) console.error(err);
        const jsfile = files.filter(f => f.split('.').pop() === 'js');
        if (jsfile.length <= 0) {
            return log.error(`Keine ${c} commands vorhanden!`);
        } else {
            log.log(`${c}-commands: ${jsfile}`);
        }
        jsfile.forEach(f => {
            const pull = require(`./commands/${c}/${f}`);
            client.commands.set(pull.config.name, pull);
            pull.config.aliases.forEach(alias => {
                client.aliases.set(alias, pull.config.name);
            });
        });
    });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Log errors
// process.on('uncaughtException', error => log.error(error));

// Login into the bot via config defined token
client.login(botConfig.token);
