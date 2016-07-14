var gulp = require('gulp'),
    //postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    //watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    //webserver = require('gulp-webserver'),
    iconfont = require('gulp-iconfont'),
    sourcemaps = require('gulp-sourcemaps'),
    consolidate = require('gulp-consolidate');

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream({match: '**/*.css'}))
      // .pipe(postcss([ autoprefixer({ browsers: ['last 3 version'] }) ]));
}); 

gulp.task("build:icons", function() {
    return gulp.src(["./icons/*.svg"]) //pass to svg icons
      .pipe(iconfont({
        fontName: "myicons",
        formats: ["ttf", "eot", "woff", "svg"],
        centerHorizontally: true,
        fixedWidth: true,
        normalize: true
      }))
      .on("glyphs", function (glyphs) {

        gulp.src("./icons/util/*.scss") // Template for css files
            .pipe(consolidate("lodash", {
                glyphs: glyphs,
                fontName: "myicons",
                fontPath: "../fonts/"
            }))
            .pipe(gulp.dest("./scss/icons")); //generated scss files with classes
      })
      .pipe(gulp.dest("./fonts/")); //icon font detination
});

gulp.task('browser-sync', ['sass'], function(){
  browserSync({
    server: {
      baseDir: "./"
    } 
  });
});
 
//gulp.task('webserver', function(){
//  gulp.src('.')
//  .pipe(webserver({
//    livereload: true,
//    directoryListing: true,
//    open: true
//  }));
//});

gulp.task('default', ['browser-sync'], function() {
 gulp.watch(['scss/**/*.scss', 'sass/**/*.scss'], ['sass']);
 gulp.watch('./**/*.html').on('change', browserSync.reload);
});
