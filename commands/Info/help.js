const fs = require('fs')
const yaml = require("js-yaml");
const discord = require("discord.js");
const {
    MessageEmbed
} = require("discord.js");
const { mainprefix, ownerid } = yaml.load(fs.readFileSync("./config.yml"));
const {
    defCol
} = require("../../colors.json");
const {
    no
} = require("../../emojis.json");

module.exports = {
    name: "help",
    description: "help command",
    category: "Info",
    run: async (client, message, args) => {
        if (args[0]) {
            return getSpecificHelp(client, message, args.join(" "));
        } else {
            return getBasicHelp(client, message);
        };
    }
};

async function getBasicHelp(client, message) {
    let prefix = mainprefix;

    const embed = new discord.MessageEmbed()
    .setColor(defCol)
    .setTimestamp()
    .setAuthor(`${client.user.username} help`, client.user.displayAvatarURL())
    .setFooter(`For ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));

    let cmd = "";

    const commandsSize = (category) => {
        return client.commands
            .filter(cmd => (cmd.category || "Uncategorized") === category).size;
    };

    const commands = (category) => {
        return client.commands
            .filter(cmd => (cmd.category || "Uncategorized") === category)
            .map(cmd => `\`${prefix}${cmd.name}\``)
            .join(", ") + ".";
    };

    for (const category of client.categories) {
        if (category.toLowerCase() !== "unlisted" && message.author.id !== ownerid) {
            embed.addField(category[0].toUpperCase() + category.slice(1) + ` [${commandsSize(category)}]`, `\`${prefix}help ${category}\``, true);
        } else if (message.author.id == ownerid) {
            embed.addField(category[0].toUpperCase() + category.slice(1) + ` [${commandsSize(category)}]`, `\`${prefix}help ${category}\``, true);
        };
    };

    return message.channel.send(embed);
}

async function getSpecificHelp(client, message, input) {
    let prefix = mainprefix;

    const commands = (category) => {
        const output = client.commands
            .filter(cmd => (cmd.category.toLowerCase() || "Uncategorized") === category)
            .map(cmd => `\`${prefix}${cmd.name}\``)
            .join(", ") + ".";

        if (output == ".") {
            return null;
        } else {
            return output;
        };
    };

    const embed = new MessageEmbed()

    let cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    let cat = commands(input.toLowerCase());

    let info = `${no} No info for **${input.toLowerCase()}**`;

    if (!cmd && !cat) {
        return message.channel.send(embed.setDescription(info));
    };

    if (cmd) {
        if (cmd.category.toLowerCase() == "unlisted" && message.author.id !== ownerid) { cmd = null; };
    };

    if (cat) {
        if (input.toLowerCase() == "unlisted" && message.author.id !== ownerid) { cat = null; };
    };

    if (!cmd && !cat) {
        return message.channel.send(embed.setDescription(info));
    };

    if (cat) {
        info = `**Category \`${input.toLowerCase()}\`:**\n`;
        info += cat;
    };

    if (cmd) {
        if (cat) {
            info += `\n\n\n**Command \`${input.toLowerCase()}\`:**\n`;
            if (cmd.name) info += `**Name**: ${cmd.name}`;
            if (cmd.description) info += `\n**Description**: ${cmd.description}`;
            if (cmd.example) info += `\n**Example**: ${cmd.example}`;
            if (cmd.usage) info += `\n**Usage**: ${cmd.usage}`;
            if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `${a}`).join(", ")}`;
        } else {
            info = `**Command \`${input.toLowerCase()}\`:**\n`;
            if (cmd.name) info += `**Name**: ${cmd.name}`;
            if (cmd.description) info += `\n**Description**: ${cmd.description}`;
            if (cmd.example) info += `\n**Example**: ${cmd.example}`;
            if (cmd.usage) info += `\n**Usage**: ${cmd.usage}`;
            if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `${a}`).join(", ")}`;
        };
    };

    return message.channel.send(embed.setColor(defCol).setDescription(info).setFooter(`vouchbot.ml`, client.user.displayAvatarURL()).setTimestamp());
};