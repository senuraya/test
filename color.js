const chalk = require('chalk')

const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) }
const senuraLog = (text) => { return chalk.cyanBright('[ SENURA-MD ] ') + chalk.white(text) }

module.exports = { color, senuraLog }
