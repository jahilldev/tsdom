const prettier = require('gulp-prettier-plugin');
const tslint = require('gulp-tslint');
const merge = require('merge-stream');
const error = require('./error');

/* -----------------------------------
 *
 * Lint
 *
 * -------------------------------- */

module.exports = (config, gulp) => {
   const paths = [
      config.path.src + '**/*.ts*',
      config.path.tests + '**/*.spec.ts*',
   ];

   return () => {
      const format = gulp
         .src(paths)
         .pipe(
            prettier(require('../.prettierrc.json'), {
               filter: true,
            })
         )
         .pipe(gulp.dest(file => file.base));

      const linting = gulp
         .src(paths)
         .pipe(
            tslint({
               tslint: require('tslint'),
               formatter: 'stylish',
               fix: true,
            })
         )
         .pipe(
            tslint.report({
               summarizeFailureOutput: true,
            })
         );

      return merge(format, linting);
   };
};
