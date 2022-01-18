const fs = require('fs');
const yaml = require("js-yaml");
const config = yaml.load(fs.readFileSync("./config.yml"));
const { mainprefix } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = async (client, message) => {
    if (message.author.bot) return;
  
    if (!message.guild) return;
  
    let prefix = mainprefix;
  
    if (!message.content.startsWith(prefix)) return;
    
    if (!message.member) message.member = await message.guild.fetchMember(message);
  
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    let cmd = args.shift().toLowerCase();
  
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
  
    if (command) {
        command.run(client, message, args, prefix, config);
    };
    
    if (!command) return await message.react("❌");

};