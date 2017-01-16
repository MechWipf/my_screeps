'use strict'

const gulp = require('gulp')
const changed = require('gulp-changed')

gulp.task('deploy-dev', [], function () {
  let src = 'main/**/*.js'
  let dest = 'C:/Users/mechwipf/AppData/Local/Screeps/scripts/screeps.com/dev'

  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
})

gulp.task('watch-dev', ['deploy-dev'], function () {
  let watcher = gulp.watch('main/**', 'deploy-dev')
  watcher.on('changed', function (event) {
    console.log('File ' + event.path + ' was ' + event.type)
  })
})

glup.task('default', ['watch-dev'])