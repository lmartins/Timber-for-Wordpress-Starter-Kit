/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
// var config   = require('../config');
// var watchify = require('./browserify')

// gulp.task('watch', ['watchify','browserSync'], function(callback) {
gulp.task('watch', ['browserSync'], function(callback) {
    gulp.watch( 'src/sass/**/*.scss',   ['sass'] );
    // gulp.watch( config.images.src, ['images'] );
    // gulp.watch( config.markup.src, ['markup'] );
    // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
