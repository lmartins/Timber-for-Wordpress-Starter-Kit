var
    gulp        = require('gulp'),
    config      = require('../config').markup,
    // changed     = require('gulp-changed'),
    browserSync = require('browser-sync');

gulp.task('markup', function() {
    return gulp.src( config.src )
        // .pipe(gulp.dest(config.dest))
        // .pipe( changed( "views/" ) )
        .pipe( browserSync.reload({stream:true}) );
});
