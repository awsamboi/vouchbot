const Discord = require("discord.js")
const ms = require('parse-ms')

module.exports = {
    name: "profile",
    description: "Check users vouches.",
    category: "Vouching",
    run: async (client, message, args) => {
        let guild = message.guild.iconURL()
         let user = message.mentions.members.first() || message.member;
         let database2 = await process.bin.db.get(`uservouchs_${user.id}`)
         if(database2 === null) database2 = [];
        
        if (user.user.bot){
            return message.channel.send("You can't view bot profile.");
        };
  
         let vouchs = await process.bin.db.get(`uservouchs_${user.id}`)
         let profile = new Discord.MessageEmbed()
         .setTitle(`${user.username || user.user.username} Profile`)
         .addField(`User ID:`, user.id, true)
         .addField(`Global Users Vouches`, database2 == [] ? 0 : database2.length, true)
         .setThumbnail(guild)
         .setFooter(message.author.username, message.author.displayAvatarURL)
         let database = await process.bin.db.get(`uservouchs_${user.id}`)
         
         if(database && database.length) {
            let array =[]
            database.forEach(m => {
              array.push(`Voucher: ${m.author} | **Reason**: ${m.reason}`)

            })
         if(database === null) database = `${user.username} he doens't have any vouches!`
            profile.addField("User vouches", array.join(" \n "))
        }
        return message.channel.send(profile);

}}