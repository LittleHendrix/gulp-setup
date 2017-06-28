var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
var size = require('gulp-size');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var stripdebug = require('gulp-strip-debug');
var autoprefixer = require('gulp-autoprefixer');
var filter = require('gulp-filter');
var livereload = require('gulp-livereload');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

var paths = {
    scripts: {
        src: './src/js/',
        dest: './scripts/'
    },
    styles: {
        src: './src/scss/',
        dest: './css/'
    }
};

var sassStyle = 'compressed';

if (gutil.env.dev === true) {
    sassStyle = 'nested';
}


gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
		.pipe(plumber({ errorHandler: displayError }))
        .pipe(gulpif(argv.dev, sourcemaps.init({ loadMaps: true })))
		.pipe(sass({
		    outputStyle: sassStyle,
		    sourceComments: false,
		    includePaths: [
				'bower_components/foundation-sites/scss/',
                'bower_components/owl.carousel/src/scss/'
		    ]
		}))
		.pipe(autoprefixer({
		    browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3', 'Android >= 4.0']
		}))
		//.pipe(concat('app.min.css'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulpif(argv.dev, sourcemaps.write('.')))
		.pipe(size())
		.pipe(gulp.dest(paths.styles.dest));
});


// common scripts
gulp.task('js', function () {
    return gulp.src([
            paths.scripts.src + 'app.js'
    ])
        .pipe(plumber({ errorHandler: displayError }))
        .pipe(gulpif(argv.dev, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(!argv.dev, stripdebug()))
        .pipe(gulpif(argv.dev, beautify({ indentSize: 2 }), uglify({ mangle: false })))
        .pipe(concat('app.min.js', { newLine: ';' }))
        .pipe(gulpif(argv.dev, sourcemaps.write('.')))
        .pipe(size())
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('vendorjs', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery.cookie/jquery.cookie.js',
        'bower_components/owl.carousel/src/js/owl.carousel.js',
        'bower_components/owl.carousel/src/js/owl.navigation.js',
        paths.scripts.src + 'addtohomescreen.js'
    ])
		.pipe(plumber({ errorHandler: displayError }))
        .pipe(stripdebug())
        .pipe(uglify({ mangle: false }))
        .pipe(concat('vendor.min.js', { newLine: ';' }))
		.pipe(size())
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('foundationjs', function() {
    return gulp.src([
        'bower_components/foundation-sites/dist/foundation.js'
    ])
        .pipe(plumber({ errorHandler: displayError }))
        .pipe(stripdebug())
        .pipe(uglify({ mangle: false }))
        .pipe(concat('foundation.min.js', { newLine: ';' }))
		.pipe(size())
		.pipe(gulp.dest(paths.scripts.dest));
});


/*

gulp.task('modernizr', function () {
    return gulp.src([
            'bower_components/modernizr/modernizr.js'
    ])
		.pipe(plumber({ errorHandler: displayError }))
        .pipe(gulpif(argv.dev, sourcemaps.init({ loadMaps: true })))
		.pipe(uglify())
		//.pipe(rename({suffix: ".min"}))
        .pipe(concat('modernizr.min.js'))
        .pipe(gulpif(argv.dev, sourcemaps.write('.')))
		.pipe(size())
		.pipe(gulp.dest(paths.scripts.dest));
});
*/


gulp.task('watch', function () {
    // livereload.listen();
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/app.js', ['js']);
});

var displayError = function (error) {
    var errorString = '[' + gutil.colors.cyan(error.plugin) + ']';

    errorString += ' ' + error.message.replace("\n", '');

    if (error.fileName)
        errorString += ' in ' + gutil.colors.yellow(error.fileName);

    if (error.lineNumber)
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