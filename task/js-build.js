var browserify = require('browserify');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var when = require('gulp-if');
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
 * Client
 *
 * -------------------------------- */

module.exports = function (config, gulp) {

   return function () {

      return del([
         config.path.dist + '*.js*',
      ]).then(function() {
         
         return browserify({
            basedir: '.',
            debug: true,
            entries: [
               'src/tsdom.ts'
            ],
            cache: {},
            packageCache: {}
         })
         .plugin(tsify)
         .bundle()
         .on('error', error)
         .pipe(
            source('tsdom.js')
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
            gulp.dest(config.path.dist)
         );
         
      });

   };

};