'use strict'

let gulp = require('gulp')
let webpack = require('gulp-webpack')
let screeps = require('gulp-screeps')

gulp.task('clean', () => {
    return true
})

gulp.task('build', gulp.series(() => {
    return gulp.src('src')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist'))
}))

gulp.task('upload', () => {
    return gulp.src('/dist/*.js')
        .pipe(screeps(require('./creds')))
})

gulp.task('default', gulp.series(['build', 'upload']))