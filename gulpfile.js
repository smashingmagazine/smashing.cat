//==============================================//
// My very first Gulpfile – so exciting (I guess)
//==============================================//

//==============================================//
// Require all the things
//==============================================//

// Gulp
var gulp = require('gulp');

// HTML
var htmlmin = require('gulp-htmlmin');

// LESS
var less = require('gulp-less');

// PostCSS
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var cssnano       = require('cssnano');

// Javascript
var uglify = require('gulp-uglify');

// Images
var imagemin = require('gulp-imagemin');

// Caching of processed files
var cache = require('gulp-cache');

// Browser-Sync for continous development
var browserSync = require('browser-sync');

//==============================================//
// Tasks to run
//==============================================//

// Lint & Minify HTML
gulp.task('html', function() {
  return gulp.src('app/rawhtml/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      html5: true,
      keepClosingSlash: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeEmptyElements: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }))
    .pipe(gulp.dest('./'));
});

// LESS to CSS
gulp.task('less', function() {
  return gulp.src('./app/*.less')
    .pipe(less()) // using gulp-less
    .pipe(gulp.dest('./app/rawcss/'));
});

// CSS optimizations
gulp.task('postit', function() {
  var processors = [

    autoprefixer({
      browsers: ['last 2 versions']
    }),

    cssnano(),
  ];

  return gulp.src('./app/rawcss/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Javascript minification
gulp.task('uggli', function() {
  return gulp.src('./app/rawjs/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

// Images
gulp.task('images', function() {
  return gulp.src('./app/rawimg/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(
      imagemin({
        // Interlaced for gifs
        interlaced: true,

        // Progressive JPG by default
        progressive: true
      }))
    )
    .pipe(gulp.dest('./img/'));
});

// Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
});

// Watch Block
gulp.task('watch', ['browserSync', 'html', 'less', 'postit', 'uggli', 'images'], function() {
  gulp.watch('app/rawhtml/*html', ['html']);
  gulp.watch('app/rawcss/**/*.less', ['less', 'postit']);
  gulp.watch('app/rawjs/*.js', ['uggli']);
  gulp.watch('app/rawimg/*.+(png|jpg|jpeg|gif|svg)', ['images']);
});
