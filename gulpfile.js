const production = ( process.env.NODE_ENV == 'production' );

//base part

let {src, dest, parallel, series, watch} = require('gulp'),
    rename  = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack  = require('webpack'),
    notifier = require('node-notifier'),
    pug = require('gulp-pug'),
    nothing = require("gulp-empty"),
    exec = require('child_process').exec,
    imagemin = require('gulp-imagemin');

//css part
let sass = require('gulp-sass')(require('sass')),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

let webpackConfig = require('./webpack.config.js');
let statsLog      = { // для красивых логов в консоли
    colors: true,
    reasons: true
};

const buildFolder = 'dist',
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

function styles() {
    return src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .on('error', swallowError)
        .pipe(autoprefixer({
            browsers: ['last 5 versions', '> 5%'],
            cascade: false
        }))
        .pipe(cleanCSS({level: {1: {specialComments: false}}}))
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(pathFiles.build.css));
}

function scripts(done){

    function onError(error) {

        console.log(error);
        notifier.notify({ // чтобы сразу узнать об ошибке
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

}

function views() {
    return src(pathFiles.src.htmlPages)
        .pipe(pug({
            pretty: true
        }))
        .on('error', swallowError)
        .pipe(dest(pathFiles.build.html));
}

function images() {
    return src( pathFiles.src.img )
        .pipe( production ? imagemin() : nothing() )
        .pipe( dest(pathFiles.build.img) )
}

function gulpWatch(done) {
    watch(pathFiles.src.css, styles);
    watch(pathFiles.src.js, scripts);
    watch(pathFiles.src.htmlAll, views);
    watch(pathFiles.src.img, images);
}

function server(done){
    exec('http-server ./' + buildFolder + ' -p ' + port);
    done();
}

exports.styles = styles;
exports.scripts = scripts;
exports.views = views;
exports.images = images;
exports.gulpWatch = gulpWatch;
exports.server = server;
exports.build = series(styles, scripts, views, images);
exports.default = series( series(styles, scripts, views, images),  parallel(server, gulpWatch));