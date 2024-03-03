# Elixpo - Discord Chatbot Readme

Elixpo is a Discord chatbot built using Gemini AI and Discord.js. It's designed to provide engaging conversation experiences within Discord servers.

## Prerequisites

Before running Elixpo, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone or download the Elixpo repository to your local machine.

2. Navigate to the project directory in your terminal.

3. Run the following command to install dependencies:

   ```
   npm install
   ```

## Configuration

1. **Gemini AI API Key:**
   
   - Obtain an API key from Gemini AI (https://gemini.ai/).
   
   - Create a file named `.env` in the root directory of the project.
   
   - Add your Gemini AI API key to the `.env` file like this:
   
     ```
     API_KEY = your_gemini_api_key
     ```

2. **Discord Bot Token:**

   - Create a Discord application and bot on the Discord Developer Portal (https://discord.com/developers/applications).
   
   - Obtain your bot token.
   
   - Add your Discord bot token to the `.env` file like this:
   
     ```
     TOKEN=your_discord_bot_token_here
     ```

3. **Discord Channel ID:**
   
   - Identify the Discord channel where you want Elixpo to operate.
   
   - Replace the `CHANNELS` array in `elixpo.js` with your desired Discord channel ID(s).
   - Put the Discord Channel ID(s) in this line inside the code:
   ```
   client.channels.cache.get("put the channel ID to send a welcome message").send("Elixpo > Bonjour!");
   ```
   This will send a welcome message whenever the BOT is online! (use // to comment if feature not needed)

## Usage

1. Run the bot using the following command:

   ```
   node elixpo.js
   ```

2. Once the bot is running, invite it to your Discord server using the OAuth2 URL generated from the Discord Developer Portal.

3. Start chatting with Elixpo in the designated channel, and enjoy the conversation!

## Commands

Elixpo responds to natural language inputs and engages in conversations with users. There are no specific commands required to interact with the bot.

## Additional Notes

- Elixpo leverages Gemini AI's powerful natural language processing capabilities to provide human-like conversations.

- You can customize Elixpo's behavior and responses by adjusting the settings and configurations in the `elixpo.js` file.

- For any issues or feature requests, please feel free to open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Feel free to enhance and customize Elixpo according to your needs! If you have any questions or encounter any difficulties, don't hesitate to reach out for assistance.
