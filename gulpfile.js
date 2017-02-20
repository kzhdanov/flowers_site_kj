var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    minify = require('gulp-clean-css');

var paths = {
  scripts: 'public/dev/js/index.js',
  css: 'public/styles/main.css',
};

gulp.task('css', function () {
  return gulp.src(paths.css)
         .pipe(minify({ compatibility: 'ie10' }))
         .pipe(gulp.dest('public/build/'));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
         .pipe(uglify())
         .pipe(gulp.dest('public/build/js'));
});

gulp.task('watch', function () {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'scripts', 'css']);