'use strict';

var gulp            = require('gulp'),
    connect         = require('gulp-connect'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    cleanhtml       = require('gulp-cleanhtml'),
    dev             = require('gulp-dev'),
    browserSync     = require('browser-sync'),
    plugins         = gulpLoadPlugins(),
    info            = require('./package.json');

var config = {

  JS: {
    src: ["src/js/**/*.js"],
    build: "build/js/",
    buildFiles: "build/js/*.js"
  },

  IMAGES: {
    src: ["src/images/**/*.jpg", "src/images/**/*.svg", "!src/images/**/*.png"],
    build: "build/images/",
    png: {
      src: "src/images/**/*.png",
      build: "build/images/"
    }
  },

  HTML:{
    src: [
        '**/*.php',
        '**/views/*.twig',
        '../wip-parent-theme/views/**/*.twig',
        ]
    // build: "./app/"
  },

  // Icons
  ICONS: {
    src      : 'src/sass/components/icons/svg/*.svg',
    build    : 'build/css/fonts/',
    fontname : 'icons'
  },

  SASS: {
    src: ["src/sass/**/*.scss", "../wip-parent-theme/sass/**/*.scss"],
    build: "build/css/"
  }

}

// SERVER ---------------------------------------------------------------------
gulp.task('browser-sync', function() {
  browserSync({
    proxy: "http://wp-beta.dev/",
    browser: "",
    online: true,
    open: false
  });
});




// SASS -----------------------------------------------------------------------

gulp.task('sass', function () {
  gulp.src( config.SASS.src )
    .pipe( plugins.plumber() )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.sass({
        includePaths: [
            '../wip-parent-theme/sass/',
            './src/sass/'
            ],
        outputStyle: 'normal',
        debugInfo: false
        }) )
    .on('error', function(err){
        browserSync.notify(err.message, 35000);
        this.emit('end');
    })
    .pipe( plugins.autoprefixer (
      "last 1 versions"
      ))
    .pipe( plugins.sourcemaps.write('./', {includeContent: false, sourceRoot: '../../src/sass/'}) )
    .pipe( plugins.sourcemaps.write('./') )
    .pipe( gulp.dest( config.SASS.build ) )
    .pipe( plugins.filter( '**/*.css') ) // Filtering stream to only css files
    .pipe( browserSync.reload({ stream: true }) );
});





// JAVASCRIPT RELOADING -------------------------------------------------------
gulp.task('js', function () {
  return gulp.src( config.JS.buildFiles )
    .pipe( plugins.changed ( config.JS.buildFiles ))
    .pipe( plugins.filter('**/*.js'))
    .pipe( browserSync.reload({ stream: true }) );
    // .pipe( plugins.livereload() );
});


// IMAGE OPTIMIZATION ---------------------------------------------------------

gulp.task('buildPNG', function () {
  gulp.src( config.IMAGES.png.src )
    .pipe( plugins.changed ( config.IMAGES.png.build ))
    .pipe( plugins.tinypng ('-j_4az5UqUd_DVMtEfyi4CscLAS0Nsd1'))
    .pipe( gulp.dest( config.IMAGES.png.build ) )
    .pipe( browserSync.reload({ stream: true }) );
    // .pipe( plugins.livereload() );
});

gulp.task('buildIMG', function () {
  gulp.src( config.IMAGES.src )
    .pipe( plugins.changed ( config.IMAGES.build ))
    .pipe( plugins.imagemin ({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe( gulp.dest( config.IMAGES.build ) )
    .pipe( browserSync.reload({ stream: true }) );
    // .pipe( plugins.livereload() );
});


// HTML TEMPORARIO --------------------------------------------------------------
gulp.task('html', function () {
  return gulp.src( config.HTML.src )
    // .pipe( cleanhtml() )
    // .pipe( dev(true) )
    // .pipe( gulp.dest( config.HTML.build ) )
    .pipe( browserSync.reload({ stream: true }) );
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


// ICONS ----------------------------------------------------------------------
gulp.task('icons', function(){
  gulp.src("src/sass/components/icons/icons.sketch")
    .pipe( plugins.sketch({
      export: 'slices',
      formats: 'svg'
    }))
    .pipe( plugins.iconfontCss({
      fontName: config.ICONS.fontname,
      path: './src/sass/components/icons/_icons-template.scss',
      targetPath: '../../../src/sass/components/icons/_icons.scss',
      fontPath: './fonts/',
    }))
    .pipe( plugins.iconfont({
      fontName: config.ICONS.fontname
    }))
    .pipe(gulp.dest( config.ICONS.build ));
});


// DEPLOY ---------------------------------------------------------------------
// Runs the deployment script
// Use it after pushing the local repo into the remote repository
gulp.task('deploy', function () {
  plugins.run('ssh wordpress@wp.webispot.com "cd wordpress/mw-public/themes ; git pull"').exec()
    // .pipe(gulp.dest('output'))    // Writes "Hello World\n" to output/echo.
})




// GLOBAL TASKS ---------------------------------------------------------------

gulp.task('watch', function () {
  // gulp.watch( config.HTML.src , [browserSync.reload] );
  gulp.watch( config.HTML.src , ['bs-reload'] );
  gulp.watch( config.JS.src , ["webpack"]);
  gulp.watch( config.JS.buildFiles , ["js"] );
  gulp.watch( config.IMAGES.png.src , ['buildPNG'] );
  gulp.watch( config.SASS.src , ['sass']  );
});

gulp.task('default', ['set-env-prod', 'browser-sync', 'watch']);
gulp.task('dev', ['browser-sync', 'watch']);
gulp.task('build', ['set-env-prod', 'webpack', 'sass-build'] );
gulp.task('server', ['browser-sync'] );
