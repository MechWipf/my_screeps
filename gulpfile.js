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
    function copyJson() {
        return gulp.src('src/btrees/*.json')
            .pipe(gulp.dest('dist'))
    },
    // Patch the mapfile so screeps can read it
    function patchJsonFiles() {
        return gulp.src('dist/*.json')
            .pipe(insert.prepend('module.exports='))
            .pipe(rename({ extname: '.js' }))
            .pipe(gulp.dest('dist'))
    },
    // And cleanup the json file, since screeps can not read that
    function cleanJsonFiles() {
        return gulp.src('dist/*.json')
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

gulp.task('copy-local', () => {
    let src = ['dist/*.js']
    let dest = 'C:\\Users\\mechwipf\\AppData\\Local\\Screeps\\scripts\\kiwigaming_de___21025\\dev'

    return gulp.src(src)
        .pipe(gulp.dest(dest))
})

gulp.task('watch', () => {
    return gulp.watch('src/**/*.*', gulp.series(['build', 'upload']))
})

gulp.task('deploy-local', gulp.series(['build', 'copy-local']))
gulp.task('default', gulp.series(['build', 'upload']))