let fs = require('fs');
const config = require('../bot.json');
const isDev = config.isDev;

let errorLogFile = './logs/error.log';
let logLogFile = './logs/log.log';

let date = new Date();

if (!fs.existsSync(`./logs/`)) fs.mkdirSync(`./logs/`);
if (!fs.existsSync(`./logs/old/`)) fs.mkdirSync(`./logs/old/`);

fs.readdir('./logs/', (err, files) => {
    if (err) return error(err);
    if (isDev) return;

    // timestamp for log directory
    date = new Date();
    let logstamp = `${(date.getMonth() + 1).toString().padStart(2, '0')}_${date.getDate().toString().padStart(2, '0')}_${date.getFullYear().toString().padStart(4, '0')} ${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}`;

    let logfile = files.filter(f => f.split('.').pop() === 'log');
    // create folder
    fs.mkdirSync(`./logs/old/${logstamp}`);
    logfile.forEach(file => {
        var oldPath = `./logs/${file}`;
        var newPath = `./logs/old/${logstamp}/${file}`;

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            log('Successfully moved old logs');
        });
    });
});

const log = async function (...args) {
    const text = args.join(' ');
    console.log(`[${getTimeStamp()}] \x1b[93m[Gonzman]\x1b[0m`, text);
    if (isDev) return;
    try {
        if (fs.existsSync(logLogFile)) {
            fs.appendFile(logLogFile, text, function (err) {
                if (err) throw err;
            });
        } else {
            let stream = fs.createWriteStream(logLogFile);
            stream.once('open', function (fd) {
                stream.write(`[${getTimeStamp()}] ` + text);
                stream.write(`\n`);
                stream.end();
            });
        }
    } catch (err) {
        error(err);
    }
};

// log for errors
let error = async function (...args) {
    const text = args.join(' ');
    console.log(`[${getTimeStamp()}] [ERROR]`, text);
    if (isDev) return;
    try {
        if (fs.existsSync(errorLogFile)) {
            fs.appendFile(errorLogFile, text, function (err) {
                if (err) throw err;
            });
        } else {
            let stream = fs.createWriteStream(errorLogFile);
            stream.once('open', function (fd) {
                stream.write(`[${getTimeStamp()}] [ERROR] ` + text);
                stream.write(`\n`);
                stream.end();
            });
        }
    } catch (err) {
        error(err);
    }
};

function getTimeStamp() {
    const today = new Date();
    return ('00' + today.getHours()).slice(-2) + ':' + ('00' + today.getMinutes()).slice(-2) + ':' + ('00' + today.getSeconds()).slice(-2);
}

// export the functions
module.exports = {
    error: error,
    log: log,
};
