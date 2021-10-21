const Discord = require('discord.js');
const {exec} = require('child_process');

// fetch();
console.log('Load update manager');

const restartTime = 1000 * 60 * 5; // 5 Min

class Update {
    static init(client) {
        this.check(client);
        setInterval(() => {
            this.check(client);
        }, 1000 * 60 * 5);
    }
    static check = async function (client) {
        exec('cd /home/sunshinerp-discord', (error, stdout, stderr) => {
            if (error) {
                return console.log(`error: ${error.message}`);
            }
            if (stderr) {
                return console.log(`stderr: ${stderr}`);
            }
        });
        exec('git pull', (error, stdout, stderr) => {
            if (error) {
                return console.log(`error: ${error.message}`);
            }
            if (stderr) console.log(`stderr: ${stderr}`);

            if (!stdout.includes('Already up to date') && !stdout.includes('Bereits aktuell.')) {
                console.log('Fetched from Git, restart in 300 seconds');
                const ch = client.channels.cache.get('786345541550080081');
                if (!ch) return;
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Bot Auto-Update Restart!`)
                    .setDescription(`Es wurde ein Update von Github gepullt, Automatischer Restart!`)
                    .addField('Restart in:', `${restartTime / 1000 / 60} Minuten!`, false)
                    .setTimestamp();
                ch.send({embeds: [embed]});

                setTimeout(() => {
                    process.exit(0);
                }, restartTime);
            } else {
                // console.log('Bot is up to date!');
            }
        });
    };
}

// export the functions
module.exports = {
    Update: Update,
};
