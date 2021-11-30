var gulp          = require('gulp'),
	sass          = require('gulp-sass'),
    fileinclude   = require('gulp-file-include'),
    clean         = require('gulp-clean'),
	browserSync   = require('browser-sync').create(),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
    imagemin 	  = require('gulp-imagemin'),
	notify        = require('gulp-notify');

gulp.task('clean', function() {
    return gulp.src('build/')
        .pipe(clean());
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('php', function() {
	return gulp.src('app/*.php')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html-file-include', function() {
	return gulp.src('app/includes/**/*')
		.pipe(gulp.dest('build/includes/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('styles', function() {
	return gulp.src('app/sass/*.sass')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 10 versions']))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/js/**/*'
		])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('libs', function() {
	return gulp.src('app/libs/**/*')
		.pipe(gulp.dest('build/libs/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('images', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin())
		.pipe(gulp.dest('build/img/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('build/fonts/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
        notify: false
    })
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.html', gulp.parallel('html'));
    gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
    gulp.watch(['libs/**/*.js', 'app/js/*.js'], gulp.parallel('scripts'));
    gulp.watch('app/img/**/*', gulp.parallel('images'));
    gulp.watch('app/fonts/*.*', gulp.parallel('fonts'));
});

gulp.task('default', gulp.parallel('html', 'php', 'html-file-include', 'styles', 'fonts', 'scripts', 'libs', 'images', 'browser-sync', 'watch'));
