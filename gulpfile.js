'use strict'

let gulp = require('gulp')
let webpack = require('gulp-webpack')
let screeps = require('gulp-screeps')
let insert = require('gulp-insert')
let clean = require('gulp-clean')
let rename = require('gulp-rename')

gulp.task('clean', () => {
    return true
})

gulp.task('build', gulp.series(
    // Cleanup
    function preBuildClean() {
        return gulp.src('dist/**/*')
            .pipe(clean())
    },
    // Transcribe the app
    function transcribe() {
        return gulp.src('src')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(gulp.dest('dist'))
    },
    // Patch the mapfile so screeps can read it
    function patchSourceMap() {
        return gulp.src('dist/map.json')
            .pipe(insert.prepend('module.exports='))
            .pipe(rename({ extname: '.js' }))
            .pipe(gulp.dest('dist'))
    },
    // And cleanup the json file, since screeps can not read that
    function cleanSourceMap() {
        return gulp.src('dist/map.json')
            .pipe(clean())
    }
))

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