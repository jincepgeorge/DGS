// gulp
var gulp = require('gulp');

// plugins
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var inject= require('gulp-inject');

gulp.task('clean', function() {
    gulp.src(['../www/app','../www/assets' ,'!../www/index.html'])
      .pipe(clean({force: true}));
    
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./assets/**/*.css', '!./node_modules/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('../www/assets'))
});
gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./node_modules/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('../www/app'))
});

gulp.task('copy-html-files', function () {
  gulp.src(['./app/**/*.html','!./index.html'])
    .pipe(gulp.dest('../www/app'));
});
gulp.task('copy-assets', function () {
  gulp.src(['./assets/**/*.*','!assets/**/*.css'])
    .pipe(gulp.dest('../www/assets'));
});

gulp.task('watch', function() {
  gulp.watch(['./assets/**/*.*','./app/**/*.*'], ['build']);
});

gulp.task('copy-vendor', function () {
  var vendprFiles=require('./vendor.json');
  gulp.src(vendprFiles.scripts)
    .pipe(gulp.dest('../www/app/lib/js'));
     gulp.src(vendprFiles.styles)
    .pipe(gulp.dest('../www/app/lib/css'));
     gulp.src(['./node_modules/bootstrap/fonts/*.*','./node_modules/font-awesome/fonts/*.*'])
    .pipe(gulp.dest('../www/app/lib/fonts'));
});

gulp.task('inject-files', function () {
  var target = gulp.src('../www/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['../www/**/*.js','../www/**/*.css','!../www/**/app.css','!../www/**/jquery.min.js','!../www/**/highcharts-more.js','!../www/**/highcharts.js', '!../www/**/solid-gauge.js','!../www/**/angular.min.js'], {read: false});
 
  return target.pipe(inject(sources,{relative: true}))
    .pipe(gulp.dest('../www'));
});

// default task
gulp.task('default',
  ['watch']
);

// build task
gulp.task('compile', function() {

   runSequence(
       ['clean']
  ,function(){
    console.log("Clean Finished");
    setTimeout(function () {
       runSequence(
       ['copy-vendor','minify-css','minify-js', 'copy-html-files','copy-assets']
  );
    }, 3000);
    
  });
 
});
// build task
gulp.task('build', function() {
  runSequence(
       ['compile']
  ,function(){
    console.log("Do something after compile");
    setTimeout(function () {
      gulp.start('inject-files');
    }, 10000);
    
  });
});