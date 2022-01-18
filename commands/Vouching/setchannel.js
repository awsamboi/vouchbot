const Discord = require("discord.js")
const ms = require('parse-ms')

module.exports = {
    name: 'setchannel',
    description: "set the channel for vouching",
    category: "Vouching",
    run: async (client, message, args) => {
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(`Please mention a channel!`);
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You must have **MANAGE_CHANNEL** permission to use this command");
        await process.bin.db.set(`vouch_${message.guild.id}`, channel.id)
        message.channel.send(`The vouching channel have been set to ${channel}`)
}}