const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

function buildStyles() {
    return src('./src/scss/index.scss')
        .pipe(sass())
        .pipe(dest('./src/css'))
}

function watchTask() {
    watch(['./src/scss/index.scss'], buildStyles)
}

exports.default = series(buildStyles, watchTask)