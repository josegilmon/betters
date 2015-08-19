/*
* Dependencias
*/
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', browserSync.reload);

// Static server
gulp.task('default', function() {
  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  });
  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("public/*.*", ['js-watch']);
});
