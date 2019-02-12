const browserify = require('browserify');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const when = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const del = require('del');
const error = require('./error');

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const RELEASE = process.argv.includes('--release');

/* -----------------------------------
 *
 * Include
 *
 * -------------------------------- */

module.exports = function(config, gulp) {
   return function() {
      return del([config.path.dist + 'tsdom.inc.js*']).then(function() {
         return browserify({
            basedir: '.',
            debug: true,
            standalone: 'tsdom',
            entries: [config.path.src + 'include.js'],
            cache: {},
            packageCache: {},
         })
            .plugin(tsify)
            .bundle()
            .on('error', error)
            .pipe(source('tsdom.inc.js'))
            .pipe(buffer())
            .pipe(when(!RELEASE, sourcemaps.init()))
            .pipe(uglify(config.uglify))
            .pipe(when(!RELEASE, sourcemaps.write('./')))
            .pipe(gulp.dest(config.path.dist));
      });
   };
};
