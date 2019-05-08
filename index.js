'use strict';

const Discord = require('discord.js');

class Mention {
  constructor(member = undefined, role = undefined, channel = undefined) {
    if (member) this.member = member;
    if (role) this.role = role;
    if (channel) this.channel = channel;
  }
}

module.exports = 
/**
 * Returns a Mention object with a `member` (`GuildMember`), `role` (`Role`), or `channel` (`GuildChannel`) property corresponding with the given mention, or `undefined` if the given string is *not* a mention.
 * @param {string} string 
 * @param {Discord.Guild} guild 
 */

function(string, guild) {
  if (typeof string !== 'string') throw new TypeError('Invalid string provided.');
  if (!(guild instanceof Discord.Guild)) throw new TypeError('Invalid guild provided.');

  const match = string.match(/^<(@!?|@&|#)(\d{18})>$/);

  if (match) {
    const id = match[2];

    if (string.match(/^<@!?(\d{18})>$/)) return new Mention(guild.member(id));
    else if (string.match(/^<@&(\d{18})>$/)) return new Mention(undefined, guild.roles.get(id));
    else if (string.match(/^<#(\d{18})>$/)) return new Mention(undefined, undefined, guild.channels.get(id));
  } else return undefined;
};
