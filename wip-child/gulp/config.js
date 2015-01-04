var dest = "./build";
var src = './src';

module.exports = {

    browserSync: {
        // server: {
        //     baseDir: dest
        // },
        proxy: "http://wptimber.dev/",
        browser: "",
        online: true,
        open: false
    },

    sass: {
        src: src + "/sass/**/*.scss",
        dest: dest + "/css",
        settings: {
            includePaths: [
                '../wip-parent-theme/sass/',
                // './src/sass/'
                ],
            outputStyle: 'normal',
            debugInfo: false
        }
    },

    images: {
        src: src + "/images/**",
        dest: dest + "/images"
    },

    markup: {
        src: [
            "views/**/*.twig",
            "fw/**/*.php",
            ]
    },

    browserify: {
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [
            {
                entries: src + '/js/app.js',
                dest: dest + '/js/',
                outputName: 'app.js',
                // Additional file extentions to make optional
                // extensions: ['.coffee', '.hbs'],
                // list of modules to make require-able externally
                require: ['jquery']
            },
            // {
            //     entries: src + '/javascript/page.js',
            //     dest: dest,
            //     outputName: 'page.js',
            //     // list of externally available modules to exclude from the bundle
            //     external: ['jquery', 'underscore']
            // }
        ]
    },

}

