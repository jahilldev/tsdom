var browserify = require('browserify');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var when = require('gulp-if');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var del = require('del');
var error = require('./error');


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

var release = process.argv.includes('--release');


/* -----------------------------------
 *
 * Include
 *
 * -------------------------------- */

module.exports = function (config, gulp) {

   return function () {

      return del([
         config.path.dist + 'tsdom.inc.js*',
      ]).then(function() {

         return browserify({
            basedir: '.',
            debug: true,
            standalone: 'tsdom',
            entries: [
               config.path.src + 'include.js'
            ],
            cache: {},
            packageCache: {}
         })
         .plugin(tsify)
         .bundle()
         .on('error', error)
         .pipe(
            source('tsdom.inc.js')
         )
         .pipe(
            buffer()
         )
         .pipe(
            when(!release, sourcemaps.init())
         )
         .pipe(
            uglify(config.uglify)
         )
         .pipe(
            when(!release, sourcemaps.write('./'))
         )
         .pipe(
            gulp.dest(
               config.path.dist
            )
         );
         
      });

   };

};