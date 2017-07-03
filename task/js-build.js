var browserify = require('browserify');
var tscript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var when = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var del = require('del');
var error = require('./error');
var tsproject = tscript.createProject('./tsconfig.json');


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

var release = process.argv.includes('--release');


/* -----------------------------------
 *
 * Client
 *
 * -------------------------------- */

module.exports = function (config, gulp) {

   return function () {

      return del([
         config.path.dist + '*.js*',
      ]).then(function() {
         
         return gulp.src(
            config.path.src + 'tsdom.ts'
         )
         .pipe(
            when(!release, sourcemaps.init())
         )
         .pipe(tsproject())
         .on('error', error)
         .pipe(
            buffer()
         )
         .pipe(
            uglify(config.uglify)
         )
         .pipe(
            when(!release, sourcemaps.write('./'))
         )
         .pipe(
            gulp.dest(config.path.dist)
         );
         
      });

   };

};