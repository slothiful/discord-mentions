<p align="center">
    <a href="https://github.com/slothiful/d.js-mentions"><img width="250" height="62.5" src="https://github.com/slothiful/d.js-mentions/blob/master/logo.png?raw=true"></a>
</p>
<p align="center">
    <a href="https://github.com/slothiful/d.js-mentions">
        <img src="https://img.shields.io/npm/v/d.js-mentions.svg">
        <img src="https://img.shields.io/bundlephobia/min/d.js-mentions.svg">
        <img src="https://img.shields.io/github/issues/slothiful/d.js-mentions.svg">
    </a>
</p>

## Install
```
npm i d.js-mentions
```

## About
Easily extract a member, role, or channel from a Discord mention using [Discord.js](https://www.npmjs.com/package/discord.js).

## Usage
```js
const getMention = require('d.js-mentions');

var mention = getMention('not a mention');                          // undefined
var member = getMention('<@189855563893571595>', someGuild).member; // GuildMember
var id = getMention('<@189855563893571595>').member;                // '189855563893571595'
```
* If a valid mention and guild are provided, the response will be an object with a `member`, `role`, or `channel` property as the mentioned object.
* If the string provided is *not* a mention, `undefined` will be returned.
* If the guild parameter is omitted, the returned object's property will be the ID in the mention.

## Example
```js
// reply with '👀' when someone mentions the bot

client.on('message', message => {
    if (!message.guild || message.author.bot) return;

    var mention = getMention(message.content, message.guild); // { member: GuildMember }
    
    if (mention) {
        var member = mention.member; // GuildMember
        
        if (member && member.user.id === client.user.id) {
            console.log('I was mentioned.');
            message.channel.send(':eyes:')
                .catch(err => console.error(err));
        }
    }
});
```
