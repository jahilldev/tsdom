const gulp = require('gulp');
const sequence = require('gulp-sequence');
const config = require('./tasks/config');

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

function task(task) {
   return require('./tasks/' + task)(config, gulp);
}

/* -----------------------------------
 *
 * JS
 *
 * -------------------------------- */

gulp.task('js:module', task('js-module'));
gulp.task('js:include', task('js-include'));
gulp.task('js:lint', task('js-lint'));

/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */

gulp.task('default', sequence('js:lint', ['js:module', 'js:include']));
