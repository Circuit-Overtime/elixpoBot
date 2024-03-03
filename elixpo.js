let messageQueue = [];
require('dotenv/config');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Client } = require('discord.js');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const IGNORE_PREFIX = "!";
const CHANNELS = [""]; //put your channel ID(s) here in which the BOT can be accessed!

const client = new Client({
    intents : ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});


const generationConfig = {
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 10,
  };


// Access your API key as an environment variable (see "Set up your API key" above)
client.on("ready", () => {
    client.channels.cache.get("put the channel ID to send a welcome message").send("Elixpo > Bonjour!");
})

function divideString(inputString, maxLength) {
    const substrings = [];
    let startIndex = 0;
    
    while (startIndex < inputString.length) {
        const substring = inputString.substring(startIndex, startIndex + maxLength);
        substrings.push(substring);
        startIndex += maxLength;
    }
    
    return substrings;
}



client.on("messageCreate", async (message) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let prompt = message.content;

    if(message.author.bot) return;
    if (message.content.startsWith(IGNORE_PREFIX)) return;
    if (!CHANNELS.includes(message.channelId) && !message.users.has(client.user.id)) return;
    await message.channel.sendTyping();

    // If model is already processing a response, add the message to the queue
    if (messageQueue.length > 0) {
        messageQueue.push({ message, prompt });
        return;
    }

    // Add the current message to the queue
    messageQueue.push({ message, prompt });

    // Process the messages in the queue
    while (messageQueue.length > 0) {
        const { message, prompt } = messageQueue.shift(); // Take the first message from the queue
        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (!response) {
            message.reply("Wowsie! Seems like, I'm a bit confused! Can you please ask me again!");
            continue; // Move to the next message in the queue
        }

        const text = await response.text();

        if (text.length > 1500) {
            const textChunks = divideString(text, 1500);
            for (const txt of textChunks) {
                await message.reply(txt);
            }
        } else {
            await message.reply(text);
        }

        // Delay for 2 seconds before processing the next message in the queue
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
});

client.login(process.env.TOKEN)
