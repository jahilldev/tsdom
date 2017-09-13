var browserify = require('browserify');
var tscript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var when = require('gulp-if');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var merge = require('merge2');
var del = require('del');
var error = require('./error');
var project = tscript.createProject('./tsconfig.json');


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

var release = process.argv.includes('--release');


/* -----------------------------------
 *
 * Main
 *
 * -------------------------------- */

module.exports = function (config, gulp) {

   return function () {

      return del([
         config.path.dist + 'tsdom.js*',
      ]).then(function() {

         var result = gulp.src([
            // config.path.src + 'index.ts',
            config.path.src + '**/*.ts'
         ])
         .pipe(project());

         return merge([
            result.js
            .on('error', error)
            .pipe(
               buffer()
            )
            .pipe(
               when(release, 
                  uglify(config.uglify)
               )
            )
            .pipe(
               gulp.dest(
                  config.path.dist
               )
            ),
            result.dts
            // .pipe(
            //    rename('tsdom.d.ts')
            // )
            .pipe(
               gulp.dest(
                  config.path.dist
               )
            )
         ]);
         
      });

   };

};