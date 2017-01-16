'use strict'

const gulp = require('gulp')
const changed = require('gulp-changed')

gulp.task('deploy-dev', [], function () {
  let src = 'main/**/*.js'
  let dest = 'C:/Users/mechwipf/AppData/Local/Screeps/scripts/screeps.com/dev'

  return gulp.src(src)
    .pipe(changed(dest))
    .dest(dest)
})