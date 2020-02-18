// Requiring Discord.js.
const Discord = require('discord.js');

/**
  * **Extract the related object out of a Discord mention.**
  * @param {string} string The (assumed) mention.
  * @param {Discord.Guild} [guild] If the string is from a message, the guild it was sent in. *If omitted, the returned object's property will be an ID.*
  * @returns {Object|null} An object with a `member`, `role`, or `channel` property corresponding with the mention, or `null` if the provided string is not a mention.
  * @see https://github.com/slothiful/discord-mentions#usage
  */
function getMention(string, guild = undefined) {
  // Throwing any necessary errors.
  if (typeof string !== 'string') throw new TypeError('Invalid string provided.');
  if (typeof guild !== 'undefined' && !(guild instanceof Discord.Guild)) throw new TypeError('Invalid guild provided.');

  // Using a Regular Expression to test the mention and extract the parts.
  const match = string.match(/^<(@!?|@&|#)([0-9]+)>$/);

  if (match) {
    const prefix = match[1];
    const id = match[2];

    // Returning objects with corresponding properties.
    if (prefix.match(/^@!?$/)) return { member: guild ? guild.member(id) || id : id };
    if (prefix === '@&') return { role: guild ? guild.roles.get(id) || id : id };
    if (prefix === '#') return { channel: guild ? guild.channels.get(id) || id : id };
  } else return null; // Returning null if the provided string was not a mention.
}

// Exporting the function.
module.exports = getMention;
