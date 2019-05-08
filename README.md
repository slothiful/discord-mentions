<p align="center">
    <a href="https://github.com/slothiful/d.js-mentions"><img width="250" height="62.5" src="https://github.com/slothiful/d.js-mentions/blob/master/logo.png"></a>
</p>
<p align="center">
    <a href="https://github.com/slothiful/d.js-mentions"><img src="https://img.shields.io/npm/v/d.js-mentions.svg"></a>
</p>

## Install
```
npm i d.js-mentions
```

## About
Easily get a member, role, or channel from a Discord mention using [Discord.js](https://www.npmjs.com/package/discord.js).

## Usage
If a valid mention is provided, the response will be a Mention object with a `member`, `role`, or `channel` property. Otherwise, it will return `undefined`.

```js
const mention = require('d.js-mentions');

var member = mention('<@189855563893571595>', someGuild).member;

/*
Mention {
    member?: GuildMember
    role?: Role
    channel?: GuildChannel
}
*/
```
