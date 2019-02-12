/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

module.exports = {
   path: {
      root: './',
      dist: './dist/',
      src: './src/',
      tests: './tests/',
   },

   uglify: {
      compress: {
         dead_code: true,
         unused: true,
      },
   },
};
