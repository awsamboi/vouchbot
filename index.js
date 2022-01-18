const fs = require('fs');
const yaml = require("js-yaml");
const { token, mongourl } = yaml.load(fs.readFileSync("./config.yml"));
const discord = require('discord.js')
const client = new discord.Client();
client.commands = new discord.Collection();
const web = require('./web/app.js');

const { Database } = require("quickmongo");
const db = new Database(mongourl);

db.on("ready", async () => {
    console.log("Mongo DB connected.");

    db.table = class {
        constructor (name) {
            return db.createModel(name);
        };
    };

    process.bin = {};

    process.bin.db = db;
    require("./handlers/loader.js")(client);


    client.login(token);
    web(client);
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();