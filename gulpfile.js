var gulp 			= require('gulp'), // require Gulp
	sass 			= require('gulp-sass'), //require Sass,
	babel 			= require('gulp-babel'), //require babel (for ES6)
	browserSync 	= require('browser-sync'), // require Browser Sync
	concat 			= require('gulp-concat'), // require gulp-concat (for files concatenation)
	uglify 			= require('gulp-uglifyjs'), // require gulp-uglifyjs (for minification JS)
	cssnano 		= require('gulp-cssnano'), // require gulp-cssnano (for minification CSS)
	rename 			= require('gulp-rename'), // require gulp-rename (for changing file names)
	del 			= require('del'), // require dil (for deleting files)
	imagemin 		= require('gulp-imagemin'), // require gulp-imagemin (for img optimisation)
	pngquant 		= require('imagemin-pngquant'), // require imagemin-pngquant (for png optimisation)
	cache 			= require('gulp-cache'), // require gulp-cache (for cache management)
	spritesmith 	= require('gulp.spritesmith'), //require gulp.spritesmith (for sprites making)
	debug 			= require('gulp-debug'), //require gulp-debug (for print actions in console)
	autoprefixer 	= require('gulp-autoprefixer'); // require gulp-autoprefixer (for adding prefixes)


// -----------------------------------------------------------------------
// sass
// -----------------------------------------------------------------------

gulp.task('sass', ['css-libs'], function(){
	setTimeout(function(){ // gulp falls after @import changing without the statement
		return gulp.src('src/sass/style.scss')
			.pipe(sass())
			// .pipe(uncss({
		 //        html: ['src/index.html']
		 //    }))
			.pipe(autoprefixer([
				'Android 2.3',
      			'Android >= 4',
      			'Chrome >= 20',
      			'Firefox >= 24',
      			'Explorer >= 8',
      			'iOS >= 6',
      			'Opera >= 12',
      			'Safari >= 6'], { cascade: true }))
			.pipe(cssnano())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('src/css'))
			.pipe(browserSync.reload({stream: true}))
		}, 100);
});


// -----------------------------------------------------------------------
// css libs
// -----------------------------------------------------------------------

gulp.task('css-libs', function(){
	return gulp.src([
		'src/libs/fancyBox/source/jquery.fancybox.css', // FancyBox
		'src/libs/OwlCarousel/owl-carousel/owl.carousel.css', // OwlCarousel
		'src/libs/OwlCarousel/owl-carousel/owl.theme.css', // OwlCarousel
		'src/libs/OwlCarousel/owl-carousel/owl.transitions.css' // OwlCarousel
		

		// ...
		])
		.pipe(debug({title: 'css-libs'}))
		.pipe(concat('libs.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('src/css'));
});





// -----------------------------------------------------------------------
// js libs
// -----------------------------------------------------------------------

gulp.task('libs-js', function() {
	return gulp.src([
		'src/libs/jquery/jquery-3.1.1.js', //jQuery
		'src/libs/OwlCarousel/owl-carousel/owl.carousel.js', // jCarousel
		'src/libs/fancyBox/source/jquery.fancybox.js' // FancyBox


		// ...
		])
		.pipe(debug({title: 'libs-js'}))
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('src/js'));
});


// -----------------------------------------------------------------------
// babel
// -----------------------------------------------------------------------

gulp.task('babel', function(){
    return gulp.src('src/js/main.es6.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
        	basename: "main",
        	suffix: '.min'
        }))
        .pipe(gulp.dest('src/js'))
});


// -----------------------------------------------------------------------
// browser-sync
// -----------------------------------------------------------------------

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		}
		// , notify: false // Disable notifications
	});
});




// -----------------------------------------------------------------------
// spritesmith
// -----------------------------------------------------------------------

gulp.task('sprite', function(){
	var spriteData = gulp.src('src/img/_sprite/*.png')
		.pipe(spritesmith({
			imgName: 'spriteImg.png',
			cssName: 'spriteStyle.scss',
			algorithm: 'binary-tree'
		}));
	spriteData.img.pipe(gulp.dest('src/_sprite')); // sprite dest
	spriteData.css.pipe(gulp.dest('src/_sprite')); // styles dest
});




// -----------------------------------------------------------------------
// W A T C H
// -----------------------------------------------------------------------

gulp.task('watch', ['browser-sync', 'sass', 'libs-js', 'babel', 'sprite' ], function() {
	gulp.watch('src/sass/**/*.scss', ['sass', browserSync.reload]);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', ['babel', browserSync.reload]);
});






//========================================================================

// - P-R-O-D-U-C-T-I-O-N -

//========================================================================


// -----------------------------------------------------------------------
// clean
// -----------------------------------------------------------------------

gulp.task('clean', function() {
	return del.sync('dist');
});




// -----------------------------------------------------------------------
// img optimisation
// -----------------------------------------------------------------------

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({ 
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});



// -----------------------------------------------------------------------
// clear cache
// -----------------------------------------------------------------------

gulp.task('clear', function (callback) {
	return cache.clearAll();
})


// -----------------------------------------------------------------------
// B U I L D
// -----------------------------------------------------------------------

gulp.task('build', ['clean', 'img', 'sass', 'libs-js'], function() {

	// FONTS
	var buildFonts = gulp.src('src/fonts/**/*') 
	.pipe(gulp.dest('dist/fonts'))


	// CSS
	var buildCss = gulp.src([ 
		'src/css/style.min.css',
		'src/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))


	// JavaScript
	var buildJs = gulp.src(['src/js/**/*.js', '!src/js/main.es6.js'])
	.pipe(gulp.dest('dist/js'))


	// HTML
	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));

	// JSON
	var buildJSON = gulp.src('src/json/*.json')
	.pipe(uglify())
	.pipe(gulp.dest('dist/json'));

});




gulp.task('default', ['watch']);




// npm uninstal browser-sync del gulp gulp-autoprefixer gulp-babel gulp-cache gulp-concat gulp-cssnano gulp-debug gulp-imagemin gulp-rename gulp-sass gulp-uglifyjs gulp.spritesmith imagemin-pngquant phantomjs babel-preset-es2015