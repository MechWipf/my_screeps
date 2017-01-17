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

gulp.task('deploy-local', [], function () {
  let src = 'main/**/*.js'
  let dest = 'C:/Users/mechwipf/AppData/Local/Screeps/scripts/127_0_0_1___21025/default'

  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
})

gulp.task('watch-local', ['deploy-local'], function () {
  let watcher = gulp.watch('main/**', ['deploy-local'])
  watcher.on('changed', function (event) {
    console.log('File ' + event.path + ' was ' + event.type)
  })
})

gulp.task('watch-dev', ['deploy-dev'], function () {
  let watcher = gulp.watch('main/**', ['deploy-dev'])
  watcher.on('changed', function (event) {
    console.log('File ' + event.path + ' was ' + event.type)
  })
})

gulp.task('default', ['watch-dev'])