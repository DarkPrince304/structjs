var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');

gulp.task('default', function() {
	console.log("Running the default task!");
})

gulp.task('scripts', function() {
	gulp.src(['src/Struct.js', 'src/LinkedList.js', 'src/DoublyLinkedList.js', 'src/CircularLinkedList.js', 'src/BinarySearchTree.js', 'src/Stack.js',
	 'src/Queue.js', 'src/SuffixTree.js', 'src/Trie.js', 'src/MaxHeap.js', 'src/MinHeap.js', 'src/Draw.js'])
		.pipe(concat('struct.js'))
		.pipe(umd())
		.pipe(gulp.dest('lib/'))
		.pipe(uglify())
		.pipe(rename('struct.min.js'))
		.pipe(gulp.dest('lib/'));
});

gulp.task('umd', function() {
	return gulp.src('src/**/*.js')
		.pipe(umd())
		.pipe(gulp.dest('lib/'));
})

gulp.task('automate', ['scripts']);