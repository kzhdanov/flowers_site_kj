var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    minify = require('gulp-clean-css');
    concat = require('gulp-concat');

var paths = {
  scripts: ['public/js/jquery.min.js',
            'public/js/index.js', 
            'public/js/wallop.min.js',
            'public/js/jquery.inputmask.bundle.min.js'],
  css: 'public/styles/main.css',
  other: [ 'public/js/left_active.js', 'public/js/right_active.js' ],
};

gulp.task('css', function () {
  return gulp.src(paths.css)
         .pipe(minify({ compatibility: 'ie10' }))
         .pipe(gulp.dest('public/build/'));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
         .pipe(concat('index.js'))
         .pipe(uglify())
         .pipe(gulp.dest('public/build/'));
});

gulp.task('other', function() {
  return gulp.src(paths.other)
         .pipe(uglify())
         .pipe(gulp.dest('public/build/'));


})

gulp.task('watch', function () {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.other, ['other']);
});

gulp.task('default', ['watch', 'scripts', 'css', 'other']);