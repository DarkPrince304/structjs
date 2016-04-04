var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
	console.log("Running the default task!");
})

gulp.task('scripts', function() {
	gulp.src('src/**/*.js')
		.pipe(concat('struct.js'))
		.pipe(gulp.dest('lib/'))
		.pipe(uglify())
		.pipe(rename('struct.min.js'))
		.pipe(gulp.dest('lib/'));
});

gulp.task('automate', ['scripts']);