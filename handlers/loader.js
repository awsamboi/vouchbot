const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.load(fs.readFileSync("./config.yml"));

module.exports = async (client) => {
    const handlers = fs.readdirSync(`${process.cwd()}/handlers/handlers/`).filter(file => file.endsWith(".js"));
    for (let file of handlers) {
        await require(`${process.cwd()}/handlers/handlers/${file}`)(client);
        console.log(`Loaded the ${file.split(".")[0]} handler.`);
    };
};