const chalk = require('chalk');
const log = require('fancy-log');

/* -----------------------------------
 *
 * Error
 *
 * -------------------------------- */

module.exports = function(err) {
   const name = chalk.red(err.name + ':');
   const message = err.message;
   const output = chalk.yellow(message.replace(/\n|\r/g, ''));

   log(name);
   log(output);
};
