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
   },

   uglify: {
      compress: {
         dead_code: true,
         unused: true,
      },
   },
};
