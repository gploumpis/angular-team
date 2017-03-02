'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var server = require('gulp-server-livereload');

// add custom browserify options here
var customOpts = {
  entries: ['./src/client/app/app.module.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('js', bundle); // so you can run `gulp js` to build the file
gulp.task('assets',assets);
gulp.task('default', ['js','assets']);
gulp.task('serve', serve);

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.module.min.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./src/client/dist'));
}

function assets(){
	 return gulp.src(['./src/client/app/index.html'])
   .pipe(gulp.dest('./src/client/dist/'));
}

function serve() {
  gulp.src('./src/client/dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
    }));
}
