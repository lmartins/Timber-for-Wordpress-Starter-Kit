var
    gulp         = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    browserSync  = require('browser-sync'),
    plugins      = gulpLoadPlugins(),
    config       = require('../config').sass,
    handleErrors = require('../util/handleErrors');

// var browserSync  = require('browser-sync');
// var sass         = require('gulp-sass');
// var filter       = require('gulp-filter');
// var sourcemaps   = require('gulp-sourcemaps');
// var handleErrors = require('../util/handleErrors');
// var config       = require('../config').sass;
// var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src(config.src)
    // .pipe( sourcemaps.init() )
    .pipe( plugins.sass(config.settings) )
    .on('error', handleErrors)
    // .pipe( sourcemaps.write() )
    // .pipe( autoprefixer({ browsers: ['last 1 version'] }) )
    .pipe( gulp.dest(config.dest) )
    .pipe(  plugins.filter( '**/*.css') ) // Filtering stream to only css files
    .pipe( browserSync.reload({stream:true}) );
});
