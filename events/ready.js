const fs = require('fs');

module.exports = async (client) => {
    client.categories = fs.readdirSync(`${process.cwd()}/commands/`);
    client.randomInteger = function (upTo) {
        return Math.floor(Math.random() * upTo);
    };
    
    client.user.setActivity(`-help | ${client.guilds.cache.size} Servers`);
    console.log('Vouch Bot is started!');
};