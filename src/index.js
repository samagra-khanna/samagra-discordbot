require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.username} is online.`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    if (interaction.commandName === 'hey') {
        interaction.reply({ content: 'Hey!', ephemeral: true });
    }
    if (interaction.commandName === 'ping') {
        interaction.reply({ content: 'Pong!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);