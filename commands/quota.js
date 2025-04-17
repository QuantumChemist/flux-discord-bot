const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quota')
        .setDescription('Fetches the quota information.'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });

            const response = await fetch(`${API_URL}/quota`, {
                headers: {
                    'x-api-key': API_KEY,
                },
                timeout: 5000, // 5 seconds timeout
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                await interaction.editReply({ content: `Error: HTTP ${response.status}` });
                return;
            }

            const quota = await response.text();

            await interaction.editReply({ content: quota });

        } catch (error) {
            console.error("Quota fetch error:", error);
            await interaction.editReply({ content: 'Error: Failed to fetch quota information.' });
        }
    },
};