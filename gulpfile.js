var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync').create();
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		rsync         = require('gulp-rsync'),

		newer         = require('gulp-newer'), // filtered new file
		gulps         = require('gulp-series'),
		debug         = require('gulp-debug'),
		del           = require('del'),
		gulpIf        = require('gulp-if'),

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'compact' }).on("error", notify.onError()))
	//.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/public'));
	//.pipe(browserSync.stream())
});

gulp.task('clean', function () {
	return del('app/public');
});

gulp.task('assets', function () {
    return gulp.src('app/assets/**/*.*', {since: gulp.lastRun("assets")})
        .pipe(newer('app/public'))
        .pipe(debug({title: 'assets'}))
        .pipe(gulp.dest('app/public'));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*.*', {since: gulp.lastRun("fonts")})
        .pipe(newer('app/public'))
        .pipe(debug({title: 'fonts'}))
        .pipe(gulp.dest('app/public/fonts'));
});

// BLOCK IMG
gulp.task('images', function () {
	return gulp.src(['app/blocks/header/**/*.*', '!app/blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
		// .pipe(ignore.exclude('./styles/**/*'))
		.pipe(newer('app/public'))
		.pipe(debug({title: 'header'}))
		.pipe(gulp.dest('app/public/blocks/header'));
});

gulp.task('images2', function () {
	return gulp.src(['app/blocks/heading/**/*.*', '!app/blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
		// .pipe(ignore.exclude('./styles/**/*'))
		.pipe(newer('app/public'))
		.pipe(debug({title: 'heading'}))
		.pipe(gulp.dest('app/public/blocks/heading'));
});

gulp.task('images3', function () {
	return gulp.src(['app/blocks/sectionDevice/**/*.*', '!app/blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
		// .pipe(ignore.exclude('./styles/**/*'))
		.pipe(newer('app/public'))
		.pipe(debug({title: 'sectionDevice'}))
		.pipe(gulp.dest('app/public/blocks/sectionDevice'));
});

// COMMON IMG
gulp.task('images4', function () {
	return gulp.src(['app/common/card/**/*.*', '!app/common/**/**/styles/*'], {since: gulp.lastRun("images")})
		// .pipe(ignore.exclude('./styles/**/*'))
		.pipe(newer('app/public'))
		.pipe(debug({title: 'card'}))
		.pipe(gulp.dest('app/public/common/card'));
});

gulp.task('images5', function () {
	return gulp.src(['app/common/modal/**/*.*', '!app/common/**/**/styles/*'], {since: gulp.lastRun("images")})
		// .pipe(ignore.exclude('./styles/**/*'))
		.pipe(newer('app/public'))
		.pipe(debug({title: 'modal'}))
		.pipe(gulp.dest('app/public/common/modal'));
});

gulp.task('img', function () {
	return gulp.src('app/img/**/*.*', {since: gulp.lastRun("img")})
		.pipe(newer('app/public'))
		.pipe(debug({title: 'soft-img'}))
		.pipe(gulp.dest('app/public/img'));
});

//-------------- js, rsync --------------

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/public/js'));
	// .pipe(browserSync.reload({ stream: true }))
});

// gulp.task('rsync', function() {
// 	return gulp.src('app/**')
// 	.pipe(rsync({
// 		root: 'app/',
// 		hostname: 'username@mysite.com',
// 		destination: 'mysite/public_html/',
// 		// include: ['*.htaccess'], // Includes files to deploy
// 		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
// 		recursive: true,
// 		archive: true,
// 		silent: false,
// 		compress: true
// 	}))
// });

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'assets'), 
'fonts', 'js', 'images5', 'images4', 'images3', 'images2', 'images', 'img'));

//-------------- watch, sync --------------

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.*', gulp.series('styles'));
	gulp.watch('app/**/styles/*.*', gulp.series('styles'));
	gulp.watch('app/**/**/styles/*.*', gulp.series('styles'));
	gulp.watch('app/assets/**/*.*', gulp.series('assets'));
	gulp.watch('app/fonts/**/*.*', gulp.series('fonts', 'styles'));
	gulp.watch('app/img/**/*.*', gulp.series('img'));
	gulp.watch('app/**/images/**/*.*', gulp.series('images'));
	gulp.watch('app/**/**/images/**/*.*', gulp.series('images'));
	gulp.watch('app/**/**/**/images/**/*.*', gulp.series('images'));
	gulp.watch('app/js/*.js', gulp.series('js'));
});

gulp.task('serve', function () {
	browserSync.init({server: 'app/public'});
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

browserSync.watch('app/public/**/*.*').on('change', browserSync.reload);
