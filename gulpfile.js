//base part
let gulp = require('gulp'),
    rename  = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack  = require('webpack'),
    gutil    = require('gulp-util'),
    notifier = require('node-notifier'),
    path = require('path'),
    include = require('gulp-include'),
    pug = require('gulp-pug');

//css part
let sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

let webpackConfig = require('./webpack.config.js');
let statsLog      = { // для красивых логов в консоли
    colors: true,
    reasons: true
};

function swallowError(error){
    console.log(error.toString());
    this.emit('end');
}

gulp.task('default', ['gulp_watch']);

gulp.task('gulp_watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['styles']);
    gulp.watch('./src/ts/**/*.ts', ['scripts']);
    //gulp.watch('./src/pug/**/*.pug', ['views']);
});

gulp.task('styles', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .on('error', swallowError)
        .pipe(autoprefixer({
            browsers: ['last 20 versions', '> 5%'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', (done) => {

    console.log(done);

    function onError(error) {
        let formatedError = new gutil.PluginError('webpack', error);

        notifier.notify({ // чисто чтобы сразу узнать об ошибке
            title: `Error: ${formatedError.plugin}`,
            message: formatedError.message
        });

        done(formatedError);
    }

    function onSuccess(detailInfo) {
        gutil.log('[webpack]', detailInfo);
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

// gulp.task('views', function() {
//     return gulp.src('./src/pug/index.pug')
//         .pipe(pug())
//         .pipe(gulp.dest('./'));
// });