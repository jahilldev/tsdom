var util = require('gulp-util');


/* -----------------------------------
 *
 * Error
 *
 * -------------------------------- */

module.exports = function(err) {

   var name = util.colors.red(err.name + ':');
   var message = err.message;
   var output = util.colors.yellow(message.replace(/\n|\r/g, ''));

   util.log(name);
   util.log(output);
   
}
