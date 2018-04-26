const production = ( process.env.NODE_ENV == 'production' );

//base part
let gulp = require('gulp'),
    rename  = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack  = require('webpack'),
    notifier = require('node-notifier'),
    pug = require('gulp-pug'),
    nothing = require("gulp-empty"),
    shell = require('gulp-shell'),
    imagemin = require('gulp-imagemin');

//css part
let sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

let webpackConfig = require('./webpack.config.js');
let statsLog      = { // для красивых логов в консоли
    colors: true,
    reasons: true
};

const buildFolder = 'build',
    port = 8081;

let pathFiles = {
    build : {
        html : './' + buildFolder + '/',
        js : './' + buildFolder + '/js/',
        css  : './' + buildFolder + '/css/',
        img : './' + buildFolder + '/images/',
    },
    src : {
        htmlPages : './src/pug/pages/*.pug',
        htmlAll : './src/pug/**/*.pug',
        js : './src/ts/**/*.ts',
        css  : './src/scss/**/*.scss',
        img : './src/images/**/*.*',
    }
};

function swallowError(error){
    console.log(error.toString());
    this.emit('end');
}

gulp.task('styles', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .on('error', swallowError)
        .pipe(autoprefixer({
            browsers: ['last 10 versions', '> 5%'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(pathFiles.build.css));
});

gulp.task('scripts', (done) => {

    function onError(error) {

        console.log(error);
        notifier.notify({ // чисто чтобы сразу узнать об ошибке
            title: `Error: js`,
            message: error
        });

        done();
    }

    function onSuccess(detailInfo) {
        console.log(detailInfo);
        done();
    }

    function onComplete(error, stats) {
        if (error) { // кажется еще не сталкивался с этой ошибкой
            onError(error);
        } else if ( stats.hasErrors() ) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
            onError( stats.toString(statsLog) );
        } else {
            onSuccess( stats.toString(statsLog) );
        }
    }

    // run webpack
    webpack(webpackConfig, onComplete);

});

gulp.task('views', function() {
    return gulp.src(pathFiles.src.htmlPages)
        .pipe(pug({
            pretty: true
        }))
        .on('error', swallowError)
        .pipe(gulp.dest(pathFiles.build.html));
});

gulp.task('images', function() {
    return gulp.src( pathFiles.src.img )
        .pipe( production ? imagemin() : nothing() )
        .pipe( gulp.dest(pathFiles.build.img) )
});

gulp.task('gulp_watch', function () {
    gulp.watch(pathFiles.src.css, gulp.series('styles'));
    gulp.watch(pathFiles.src.js, gulp.series('scripts'));
    gulp.watch(pathFiles.src.htmlAll, gulp.series('views'));
    gulp.watch(pathFiles.src.img, gulp.series('images'));
});

gulp.task('server', shell.task('http-server ./' + buildFolder + ' -p ' + port));

gulp.task('build', gulp.series('styles', 'scripts', 'views', 'images'));

gulp.task('serverAndWatch', gulp.parallel('server', 'gulp_watch'));

let tasks = gulp.series('build', 'serverAndWatch');

if(production){
    tasks = gulp.series('build');
}

gulp.task('default', tasks);