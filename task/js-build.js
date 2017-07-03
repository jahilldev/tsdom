var browserify = require('browserify');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var when = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var del = require('del');
var hash = require('gulp-hash');
var error = require('./error');
var manifest = require('../package.json');
var dependencies = Object.keys(manifest && manifest.appDependencies || {});


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

var release = process.argv.includes('--release');
var nohash = process.argv.includes('--nohash');


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
               'src/app.ts'
            ],
            cache: {},
            packageCache: {}
         })
         .external(dependencies)
         .plugin(tsify)
         .bundle()
         .on('error', error)
         .pipe(
            source('client.js')
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
            when(!nohash, hash())
         )
         .pipe(
            when(!release, sourcemaps.write('./'))
         )
         .pipe(
            gulp.dest(config.path.dist)
         )
         .pipe(
            hash.manifest(config.asset.manifest, {
               deleteOld: false,
               sourceDir: config.path.dist
            })
         )
         .pipe(
            gulp.dest(config.path.dist)
         );
         
      });

   };

};