const Discord = require("discord.js")
const ms = require('parse-ms')
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "invite",
    description: "invite command",
    category: "Info",
    run: async (client, message, args) => {
        let prefix = await process.bin.db.get(`prefix_${message.guild.id}`);
       if(prefix === null) prefix = mainprefix;

 message.channel.send('https://bit.ly/vouchbot-invite')
}}
