const chalk = require('chalk')

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	return `${d}d ${h}h ${m}m ${s}s`;
}

exports.log = (text) => {
    console.log(chalk.cyanBright('[ SENURA MD ]'), chalk.white(text))
}
