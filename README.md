<p align="center">
    <a href="https://github.com/slothiful/discord-mentions"><img width="250" height="62.5" src="https://github.com/slothiful/discord-mentions/blob/master/logo.png?raw=true"></a>
</p>
<p align="center">
    <a href="https://www.npmjs.com/package/discord-mentions"><img src="https://img.shields.io/npm/v/discord-mentions.svg"></a>
    <a href="https://bundlephobia.com/result?p=discord-mentions@3.0.1"><img src="https://img.shields.io/bundlephobia/min/discord-mentions.svg"></a>
    <a href = "https://github.com/slothiful/discord-mentions/issues"><img src="https://img.shields.io/github/issues/slothiful/discord-mentions.svg"></a>
</p>

## About
Easily extract a member, role, or channel from a Discord mention using [Discord.js](https://www.npmjs.com/package/discord.js).

## Usage
```js
const getMention = require('discord-mentions');

var member = getMention('<@189855563893571595>', someGuild).member;
// Expected: GuildMember

var id = getMention('<@!189855563893571595>').member;
// Expected: '189855563893571595'

var mention = getMention('not a mention');
// Expected: null
```
Returns...
* **...when a valid mention and guild are provided:**  
    an object with a `member`, `role`, or `channel` property as the mentioned GuildMember/Role/GuildChannel.
  
* **...when a valid mention is provided, but the guild parameter is omitted:**  
    an object with a `member`, `role`, or `channel` property as the ID inside the mention.
  
* **...when an invalid mention is provided:**  
    `null`

## Example
Using the client's mention as its prefix and implementing a command which requires a mentioned recipient...
```js
const getMention = require('discord-mentions');

client.on('message', message => {
  if (!message.guild || message.author.bot) return;
  
  const args = message.content.trim().split(/\s+/g);
  
  // Ignoring the message if it doesn't start with the client's mention.
  if (getMention(args[0]) !== client.user.id) return;
  
  args.shift();
  const cmd = args[0].toLowerCase();
  
  // Simple hug command - mention a member to hug. This is where
  // 'message.mentions.members.first()' won't help, since it's
  // actually the client every time with this setup.
  if (cmd === 'hug') {
    try {
      // Making sure the first argument is a mention.
      const mention = getMention(args[1], message.guild);
      if (!mention) return await message.channel.send(':x: Please mention a member to hug.');
      
      // Making sure the mention is a member.
      const recipient = mention.member;
      if (!recipient) return await message.channel.send(':x: That\'s a mention, but not a member!');
      
      await message.channel.send(`${message.author} hugs ${recipient}!`);
    } catch(err) {
      console.error(err);
    }
  }
});
```
