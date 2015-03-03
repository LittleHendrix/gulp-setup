var basePaths = {
	src  : 'app/assets/',
	dest : 'public/assets/',
	bower: 'bower_components/'
};

var paths = {
	images: {
		src  : basePaths.src + 'images/',
		dest : basePaths.dest + 'images/min/'
	},
	scripts: {
		src  : basePaths.src + 'js/',
		dest : basePaths.dest + 'js/min/'
	},
	styles: {
		src  : basePaths.src + 'sass/',
		dest : basePaths.dest + 'css/min/'
	}
};

var appFiles = {
	styles : paths.styles.src + '**/*.scss',
	scripts: [paths.scripts.src + '**/*.js'],
	images : paths.images.src + '**/*'
};

var vendorFiles = {
	styles : [
		'css/normalize.css',
		'css/main.css'
	],
	scripts: [ 
		basePaths.bower + 'jquery/dist/jquery.js',
		basePaths.bower + 'fastclick/lib/fastclick.js' 
	],
	init: [
		basePaths.bower + 'modernizr/modernizr.js'
	]
};

var prefixConfig = {
	browser: ['> 1%', 'last 2 versions', 'Firefox ESR', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
	cascade: true,
	remove : true
};
	
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var pngquant    = require('imagemin-pngquant');
var del         = require('del');
var runSequence = require('run-sequence');
var plugins     = require('gulp-load-plugins')({
	pattern      : ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

// Allows gulp --dev to be run for a more verbose output
var isProduction = true;
var sassStyle    = 'compressed';
var sourceMap    = false;

if (gutil.env.dev === true) {
	sassStyle    = 'nested';
	sourceMap    = true;
	isProduction = false;
}

var displayError = function(error) {
    var errorString = '[' + gutil.colors.cyan(error.plugin) + ']';

    errorString += ' ' + error.message.replace("\n",''); 

    if(error.fileName)
        errorString += ' in ' + gutil.colors.yellow(error.fileName);

    if(error.lineNumber)
        errorString += ' on line ' + gutil.colors.bgRed(error.lineNumber);

    gutil.log(errorString);
	// plugins.notify.onError({
	// 	title   : "Gulp",
	// 	subtitle: "Failure!",
	// 	message : "Error: <%= error.message %>",
	// 	sound   : "Beep"
	// })(error);

	this.emit('end');
};

gulp.task('clean', function(cb) {
	del([paths.styles.dest, paths.scripts.dest, paths.images.dest], cb);
});

gulp.task('img', function() {
	return gulp.src(appFiles.images)
		.pipe(plugins.plumber({errorHandler: displayError}))
		.pipe(plugins.newer(paths.images.dest))
		.pipe(plugins.imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
		}))
		.pipe(plugins.size())
		.pipe(gulp.dest(paths.images.dest));
});

gulp.task('css', function() {
	return gulp.src(appFiles.styles)
		.pipe(plugins.plumber({errorHandler: displayError}))
		.pipe(plugins.sourcemaps.init({loadMaps: true}))
		.pipe(plugins.sass({
			outputStyle: sassStyle,
			sourceComments: sourceMap,
			inlcudePaths: [
				basePaths.bower + 'foundation/scss/'
			]
		}))
		.pipe(plugins.autoprefixer())
		.pipe(plugins.concat('app.min.css'))
		.pipe(plugins.sourcemaps.write('./maps'))
		.pipe(plugins.size())
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(plugins.filter('app.min.css'))
		.pipe(plugins.livereload());
});

gulp.task('js', function() {
	return gulp.src(appFiles.scripts)
		.pipe(plugins.plumber({errorHandler: displayError}))
		.pipe(plugins.concat('app.js'))
		.pipe(plugins.sourcemaps.init({loadMaps: true}))
		.pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(isProduction ? plugins.stripDebug() : gutil.noop())
		.pipe(isProduction ? plugins.uglify({
			mangle: true
		}) : gutil.noop())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(plugins.size())
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('vendorCss', function() {
	return gulp.src(vendorFiles.styles)
		.pipe(plugins.plumber({errorHandler: displayError}))
		.pipe(plugins.concat('vendor.css'))
		.pipe(plugins.autoprefixer())
		.pipe(isProduction ? plugins.combineMediaQueries({
            log: true
        }) : gutil.noop())
        .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('vendorJs', function() {
	return gulp.src(vendorFiles.scripts)
		.pipe(plugins.plumber({errorHandler: displayError}))
		.pipe(plugins.concat('vendor.js'))
		.pipe(plugins.stripDebug())
		.pipe(plugins.uglify({
			mangle: false
		}))
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(plugins.size())
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('jsInit', function() {
	return gulp.src(vendorFiles.init)
		.pipe(plugins.plumber({errorHandler: displayError}))
		.pipe(plugins.stripDebug())
		.pipe(plugins.uglify({
			mangle: false
		}))
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(plugins.size())
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('watch', function() {
	plugins.livereload.listen();

	gulp.watch(appFiles.images, ['img']);
	gulp.watch(appFiles.styles, ['css']);
	gulp.watch(appFiles.scripts, ['js']);
});

gulp.task('default', ['css', 'js']);

gulp.task('rebuild', function(cb) {
	runSequence('clean', ['img', 'css', 'js', 'vendorCss', 'vendorJs', 'jsInit'], cb);
});