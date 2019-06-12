
var gulp = require("gulp"),
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
autoprefixer = require("gulp-autoprefixer"),
cssnano = require("cssnano"),
sourcemaps = require("gulp-sourcemaps"),
browserSync = require("browser-sync").create();

// compile scss into css

function style() {
    return gulp
        .src('./sass/**/*.scss')
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}
var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "./sass/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "css/"
    }
}

function watch(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
        gulp.watch('./sass/**/*.scss', style);
        gulp.watch('./*.html').on('change', browserSync.reload);
        gulp.watch('./js/**/*.js').on('change', browserSync.reload);
    }

exports.style = style;
exports.watch = watch;