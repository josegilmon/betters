/*
* Dependencias
*/
var gulp = require('gulp');
var react = require('gulp-react');
var server = require('gulp-express');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Paths to use in tasks
var path = {
  APP: ['app.js', 'lib/*.js', 'models/*.js', 'routes/*.js'],
  JS: ['public/js/*.js', 'public/js/**/*.js'],
  JSX: ['public/js/*.jsx'],
  CSS: ['public/css/*.css'],
  HTML: ['public/*.html'],
  ALL: ['public/js/*.js', 'public/js/**/*.js', 'public/js/*.jsx', 'public/*.html'],
  DEST_BUILD: 'public/js/build',
  DEST: 'public'
};


gulp.task('default', ['build', 'server']);

gulp.task('notify', function (event) {
  server.notify();
});

gulp.task('build', function () {
  return browserify({
      entries: 'public/js/betters.js',
      extensions: ['.js', '.jsx'],
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('react', function () {
  return gulp.src(path.JSX)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_BUILD));
});


gulp.task('server', function () {

  // Start the server at the beginning of the task
  server.run(['bin/www']);

  gulp.watch(path.HTML, server.notify);
  gulp.watch(path.JS, ['build', 'notify']);
  gulp.watch(path.JSX, ['build', 'notify']);
  //gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(path.CSS, server.notify);
  //gulp.watch(['public/img/**/*'], server.notify);
  gulp.watch(path.APP, server.run);
});
