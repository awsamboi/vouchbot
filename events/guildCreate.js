module.exports = async (client) => {
    client.user.setActivity(`Vouch Bot | -help | ${client.guilds.cache.size} Servers`);
};