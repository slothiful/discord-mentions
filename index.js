'use strict';

// requiring Discord.js
const Discord = require('discord.js');

/**
  * Extract the related object out of a Discord mention.
  * @param {string} string The (assumed) mention.
  * @param {Discord.Guild} [guild] If the string is from a message, the guild it was sent in. *If omitted, the returned object's property will be an ID.*
  * @returns {Object|undefined} An object with a `member`, `role`, or `channel` property corresponding with the mention, or `undefined` if the provided string is not a mention.
  * @see https://github.com/slothiful/d.js-mentions#usage
  */
function getMention(string, guild = undefined) {
  // checking provided arguments and throwing necessary errors
  if (typeof string !== 'string') throw new TypeError('Invalid string provided.');
  if (typeof guild !== 'undefined' && !(guild instanceof Discord.Guild)) throw new TypeError('Invalid guild provided.');

  // using a Regular Expression to test the mention and extract the ID
  const match = string.match(/^<(@!?|@&|#)(\d{18})>$/);

  if (match) {
    const id = match[2];

    // returning objects
    if (string.match(/^<@!?(\d{18})>$/)) return { member: guild ? guild.member(id) : id };
    if (string.match(/^<@&(\d{18})>$/)) return { role: guild ? guild.roles.get(id) : id };
    if (string.match(/^<#(\d{18})>$/)) return { channel: guild ? guild.channels.get(id) : id };
  } else return; // returning undefined if the provided string was not a mention
}

// exporting the function
module.exports = getMention;