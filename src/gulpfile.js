var gulp = require("gulp"),
	rename = require("gulp-rename"),
	minifyCss = require('gulp-minify-css'),
	mmq = require('gulp-merge-media-queries'),
	gcmq = require('gulp-group-css-media-queries'),
	postcss = require('gulp-postcss'),
	runSequence = require('run-sequence'),
	connect = require("gulp-connect"),
	jade = require("gulp-jade"),
	filter = require("gulp-filter"),
	plumber = require('gulp-plumber');

var colBuild = require('./collectionBuilder');
var processors = [
	require('postcss-import'),
	require('postcss-extend'),
	require('postcss-css-variables'),
	require("postcss-custom-media"),
	require('postcss-media-minmax'),
	require('rucksack-css'),
	require('autoprefixer'),
]

gulp.task("connect",function(){
	connect.server({port:3000,livereload:true,root: "../"});
});

gulp.task("css", function(){
	return gulp.src('./css/index.css')
		.pipe(plumber())
		.pipe(postcss(processors))
		.pipe(rename("styles.css"))
		.pipe(gulp.dest('../css'))
		.pipe(connect.reload());
});

gulp.task("jade",function(){
	return gulp.src("./jade/index.jade")
		.pipe(plumber())
		.pipe(jade({
			pretty:true,
			locals: colBuild()
		}))
		.pipe(gulp.dest("../"))
		.pipe(connect.reload())
});

gulp.task('media', function(){
	return gulp.src('../css/styles.css')
		.pipe(mmq())
		.pipe(gcmq())
		.pipe(gulp.dest('../css'))
});

gulp.task('minify', function(){
	return gulp.src("../css/styles.css")
	.pipe(minifyCss())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('../css'))
});

gulp.task('build', function (cb) {
    return runSequence("jade", 'css', 'minify', cb);
});

gulp.task("watch", function(){
	gulp.watch(["./css/*.css"], ["css"]);
	gulp.watch(["./jade/*.jade", "./jade/*/*.jade"],["jade"]);
});

gulp.task('default', function (cb) {
    runSequence('connect','build','watch',cb);
});
