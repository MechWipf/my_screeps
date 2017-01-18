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
    let src = [
        'dist/*.js'
    ]

    return gulp.src(src)
        .pipe(screeps(require('./creds').dev))
})

gulp.task('watch', () => {
    return gulp.watch('src/**/*.*', gulp.series(['build', 'upload']))
})

gulp.task('default', gulp.series(['build', 'upload']))