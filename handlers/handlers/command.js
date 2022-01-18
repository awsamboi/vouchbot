const { readdirSync } = require("fs");
const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Status");

module.exports = (client) => {
    readdirSync(`${process.cwd()}/commands/`).forEach(dir => {
        const commands = readdirSync(`${process.cwd()}/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`${process.cwd()}/commands/${dir}/${file}`);
    
            if (pull.name) {
                try {
                    pull.category

                    if (!pull.category) {
                        pull.category = "uncategorized";
                    };
                } catch (e) {
                    if (e) {
                        pull.category = "uncategorized";
                    };
                };
                
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅ Parsed');
            } else {
                table.addRow(file, '❎ Failed');
                continue;
            };
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            
            delete require.cache[require.resolve(`${process.cwd()}/commands/${dir}/${file}`)];
        };
    });

    console.log(table.toString());
};