var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
// css
var sass = require('gulp-sass');
var cssmin = require('gulp-minify-css');
var csslint = require('gulp-csslint');
// js
var uglify = require('gulp-uglify');
// html template
var pug = require('gulp-pug');
// error handling
var plumber = require('gulp-plumber');
var image = require('gulp-image');
var buildFolder = 'docs';

gulp.task('scss', function () {
  return gulp.src(['src/scss/**/*.scss', '!src/scss/**/_*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(csslint())
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(buildFolder + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*')
    .pipe(image())
    .pipe(gulp.dest(buildFolder + '/img'));
});
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(buildFolder + '/js'))
    .pipe(browserSync.stream());
});

gulp.task('pug', function () {
  return gulp.src('src/**/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildFolder + ''));
});
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest(buildFolder + ''));
});

gulp.task('default', ['scss', 'js', 'pug', 'img']);

gulp.task('watch', function () {
  browserSync.init({
    server: buildFolder + ''
  });
  gulp.watch('src/js/**/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch('src/img/**/*', ['img']).on('change', browserSync.reload);
  gulp.watch(['src/scss/**/*.scss', '!src/scss/**/_*.scss'], ['scss']);
  gulp.watch('src/**/*.pug', ['pug']).on('change', browserSync.reload);
});