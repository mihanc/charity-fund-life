const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const { series, parallel } = gulp

const html = () => {
    return gulp
        .src("src/pug/*.pug")
        .pipe(
            pug({
                pretty: ' '
            })
        )
        .pipe(gulp.dest("build"))
}

const styles = () => {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
}

const scripts = () => {
    return gulp.src("src/scripts/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat("main.min.js"))
        .pipe(gulp.dest("build/js"))
}

const images = () => {
    return gulp.src("src/images/**/*")
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/images'));
}

const pdf = () => {
    return gulp.src("src/pdf/**/*")
        .pipe(gulp.dest('build/pdf'));
}

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        notify: false
    });
    browserSync.watch("build", browserSync.reload);
}

const deleteBuild = () => (
    gulp.src('build/**/*.*', {read: false})
        .pipe(clean())
)

const watch = () => {
    gulp.watch("src/pug/**/*.pug", html);
    gulp.watch("src/styles/**/*.scss", styles);
    gulp.watch("src/images/**/*", images);
    gulp.watch("src/scripts/**/*.js", scripts);
}

exports.dev = series(
    deleteBuild,
    parallel(html, styles, scripts, images, pdf),
    parallel(watch, server)
)


