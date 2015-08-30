/*
* Dependencias
*/
var gulp = require('gulp');
var react = require('gulp-react');
var server = require('gulp-express');

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

gulp.task('default', ['react', 'server']);

gulp.task('notify', function (event) {
  server.notify(event);
});

gulp.task('react', function () {
  return gulp.src('public/js/*.jsx')
    .pipe(react())
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('server', function () {
  // Start the server at the beginning of the task
  server.run(['bin/www']);

  // Restart the server when file changes
  gulp.watch(path.HTML, server.notify);
  gulp.watch(path.JSX, ['react', 'notify']);
  gulp.watch(path.JS, server.notify);
  //gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(path.CSS, server.notify);
  //gulp.watch(['public/img/**/*'], server.notify);
  gulp.watch(path.APP, server.run);
});
