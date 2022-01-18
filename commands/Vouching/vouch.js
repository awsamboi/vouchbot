const Discord = require("discord.js")
const ms = require('parse-ms')

module.exports = {
    name: "vouch",
    description: "vouch command",
    category: "Vouching",
    run: async (client, message, args) => {
        let room = await process.bin.db.get(`vouch_${message.guild.id}`)
        if(room === null) {
            return message.channel.send(`You cant use vouch command on this guild because theres no vouch room to set it use \n-setchannel #channel`)
        }
        if (message.channel.id === room) {

        let reason = args.slice(1).join(' ');
        let user = message.mentions.members.first()
        if(!user) {
            return message.channel.send(`Please mention a person to vouch -vouch @member <reason>`);
        };
        if (user.user.bot){
            return message.channel.send("You can't vouch bots.");
        };
            
        let timeout = 86400000;

        let vouch = await process.bin.db.fetch(`vouch_${message.author.id}_${user.id}`);
if (user.id === message.author.id) {
    return message.channel.send(`You can't vouch yourself!`);
}
        if (false == true/*vouch !== null && timeout - (Date.now() - vouch) > 0*/) {
          let time = ms(timeout - (Date.now() - vouch));
           let timeEmbed = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`You already vouched to that user try again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
          message.channel.send(timeEmbed)
        } else {
       
            if(!reason) {
                return message.channel.send(`Please write a reason for vouch`)
            }
            let vouchdata = {
            author: message.author.tag,
            reason: reason
            }
            await process.bin.db.push(`uservouchs_${user.id}`, vouchdata)
            message.channel.send(`You have vouched <@${user.id}>!`)
            await process.bin.db.set(`vouch_${message.author.id}_${user.id}`, Date.now())
        }
        }
        }}