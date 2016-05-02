var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	scriptJSON = require('./script.json');

gulp.task('default', function() {
});

gulp.task('sass', function() {
	/*
	'style.css': 'style.scss',
	//'editor-style.css': 'editor-style.scss'
	'styles/admin/style.css': 'styles/admin/style.scss',
	'styles/editor/style.css': 'styles/editor/style.scss',
	'styles/login/style.css': 'styles/login/style.scss',
	'styles/xsl/xml-sitemap.css': 'styles/xsl/xml-sitemap.scss'
	*/

	gulp.src('style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'));

	return gulp.src('style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'));
});

gulp.task('uglify', function() {
	gulp
		.src(scriptJSON['script.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(uglify({
			output: {
				beautify: true
			}
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'));

	return gulp
		.src(scriptJSON['script.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('script.min.js'))
		.pipe(uglify({
			mangle: true,
			ouput: {
				comments: false
			}
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'));
});