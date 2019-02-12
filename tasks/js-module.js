const browserify = require('browserify');
const tscript = require('gulp-typescript');
const uglify = require('gulp-uglify');
const when = require('gulp-if');
const buffer = require('vinyl-buffer');
const merge = require('merge2');
const del = require('del');
const error = require('./error');
const project = tscript.createProject('./tsconfig.json');

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const RELEASE = process.argv.includes('--release');

/* -----------------------------------
 *
 * Main
 *
 * -------------------------------- */

module.exports = function(config, gulp) {
   return function() {
      return del([config.path.dist + 'tsdom.js*']).then(function() {
         const result = gulp.src([config.path.src + '**/*.ts']).pipe(project());

         return merge([
            result.js
               .on('error', error)
               .pipe(buffer())
               .pipe(when(RELEASE, uglify(config.uglify)))
               .pipe(gulp.dest(config.path.dist)),
            result.dts.pipe(gulp.dest(config.path.dist)),
         ]);
      });
   };
};
