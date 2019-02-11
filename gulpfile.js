const gulp = require('gulp');
const sequence = require('gulp-sequence');
const config = require('./task/config');

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

function task(task) {
   return require('./task/' + task)(config, gulp);
}

/* -----------------------------------
 *
 * JS
 *
 * -------------------------------- */

gulp.task('js:module', task('js-module'));
gulp.task('js:include', task('js-include'));

/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */

gulp.task(
   'default',
   sequence(
      ['js:module', 'js:include']
      // 'watch'
   )
);
