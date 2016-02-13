var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	concat = require('gulp-concat');


/* build js page */

// include only modules that you want per page
/*gulp.task('build-search-page', function() {
  return gulp.src(['./src/app/js/common.js', './src/app/js/header.js', './src/app/js/search.js'])
    .pipe(concat('search-page.js'))
    .pipe(gulp.dest('./dist/js/'));
});*/

// launch jsint test
gulp.task('lint', function(){
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('js', function(){
	return gulp.src('src/js/*.js')
	.pipe(gulp.dest('public/js'));
});

gulp.task('sass', function() {
	return gulp.src('src/sass/main.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/css'));
});

/* task launcher */

/* main */
gulp.task('default', function(){
	gulp.watch("src/sass/*.scss", ["sass"]);
	gulp.watch("src/js/*.js", ["js"]);
});

/* iconfont */
gulp.task('iconfont', function() {
 return gulp.src('src/img/icons/*')
    .pipe(iconfontCss({
      fontName: 'iconfont', // nom de la fonte, doit être identique au nom du plugin iconfont
      targetPath: '../../iconsfont.css', // emplacement de la css finale
      fontPath: 'fonts/icons/', // emplacement des fontes finales
      cssClass: 'ico'
    }))
    .pipe(iconfont({
      fontName: 'iconfont', // identique au nom de iconfontCss
      normalize: true 
     }))
    .pipe( gulp.dest('public/css/fonts/icons') )
});