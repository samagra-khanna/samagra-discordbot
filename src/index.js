require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

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

client.on('interactionCreate', async (interaction) => {
    try {
        if (interaction.commandName === 'about') {
            const embed = new EmbedBuilder()
                .setTitle("Samagra")
                .setDescription('I am a discord bot made by Samagra for his private server.')
                .setColor('0x#000000')
                .addFields({
                    name: 'Usage',
                    value: 'Testing new features of Discord.js',
                    inline: true
                },
                )
                .setThumbnail('https://i.imgur.com/wxUUcRQ.png');
            interaction.reply({ embeds: [embed], ephemeral: true });
        }

        else if (interaction.isButton()) {
            await interaction.deferReply({ ephemeral: true });

            const role = interaction.guild.roles.cache.get(interaction.customId);
            if (!role) {
                interaction.reply({
                    content: 'Sorry unable to verify you!',
                    ephemeral: true,
                });
                return;
            }

            const hasRole = interaction.member.roles.cache.has(role.id);
            if (hasRole) {
                await interaction.editReply({ content: 'You are already verified, go check other channels.' });
                return;
            }

            await interaction.member.roles.add(role);
            await interaction.editReply(`You have been verified and ${role} role has been assigned to you.`);
        }
    }
    catch (error) {
        console.error(error);
    }
});

client.login(process.env.TOKEN);