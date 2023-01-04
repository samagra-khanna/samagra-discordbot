require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const roles = [
    {
        id: '1060181857880248400',
        label: 'Verify'
    },
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1060181733745643550');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary),
            );
        });

        await channel.send({
            content: 'Click verify to get access to the server.',
            components: [row],
        });

        process.exit();
    }
    catch (error) {
        console.error(error);
    }
});

client.login(process.env.TOKEN);