var
    gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins         = gulpLoadPlugins(),
    browserSync     = require('browser-sync'),
    config          = require('../config').sass;
    handleErrors    = require('../util/handleErrors');

// var browserSync  = require('browser-sync');
// var sass         = require('gulp-sass');
// var filter       = require('gulp-filter');
// var sourcemaps   = require('gulp-sourcemaps');
// var handleErrors = require('../util/handleErrors');
// var config       = require('../config').sass;
// var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src( "./src/sass/**/*.scss" )
    // .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.sass({
        includePaths: [
            '../wip-parent-theme/sass/',
            // './src/sass/'
            ],
        outputStyle: 'normal',
        debugInfo: false
    }) )
    // .on('error', handleErrors)
    // .pipe( plugins.sourcemaps.write('./') )
    // .pipe( plugins.autoprefixer({ browsers: ['last 1 version'] }) )
    .pipe( gulp.dest( "./build/css/" ) )
    // .pipe( plugins.filter( '**/*.css') ) // Filtering stream to only css files
    .pipe( browserSync.reload({stream:true}) );
});
