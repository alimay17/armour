// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {
	src,
	dest,
	watch,
	series,
	parallel
} = require('gulp');
// Importing all the Gulp-related packages we want to use
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const browsersync = require('browser-sync').create();

// File paths
const files = {
	// scssPath: 'app/scss/**/*.scss',
	htmlPath: 'app/html/**/*.html',
	jsPath: 'app/js/**/*.js',
	cssPath: 'app/css/**/**.css',
};

// Sass task: compiles the style.scss file into style.css
// function scssTask() {
// 	return src(files.scssPath, {
// 			sourcemaps: true
// 		}) // set source and turn on sourcemaps
// 		.pipe(sass()) // compile SCSS to CSS
// 		.pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
// 		.pipe(dest('dist', {
// 			sourcemaps: '.'
// 		})); // put final CSS in dist folder with sourcemap
// }

function htmlTask() {
	return src(files.htmlPath)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('docs/html'));
}

function indexTask() {
	return src('index.html')
	.pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('docs'));
}

// CSS task: concatenates and minifies CSS files to style.min.css
function cssTask() {
	return src(files.cssPath, {
			sourcemaps: true
		})
		.pipe(cleanCSS({
			debug: true,
			compatibility: 'ie8',
			level: {
				1: {
					specialComments: 0,
				},
			},
		}))
		.pipe(concat('style.min.css'))
		.pipe(postcss([autoprefixer(), cssnano]))
		.pipe(dest('docs', {
			sourcemaps: '.'
		}))
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
	return src(
			[
				files.jsPath,
				//,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
			], {
				sourcemaps: true
			}
		)
		.pipe(concat('all.js'))
		.pipe(terser())
		.pipe(dest('docs', {
			sourcemaps: '.'
		}));
}

// Cachebust
function cacheBustTask() {
	var cbString = new Date().getTime();
	return src(['index.html'])
		.pipe(replace(/cb=\d+/g, 'cb=' + cbString))
		.pipe(dest('.'));
}

// Browsersync to spin up a local server
function browserSyncServe(cb) {
	// initializes browsersync server
	browsersync.init({
		server: {
			baseDir: '.',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}

function browserSyncReload(cb) {
	// reloads browsersync server
	browsersync.reload();
	cb();
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
	watch(
		[files.cssPath, files.jsPath, files.htmlPath], {
			interval: 1000,
			usePolling: true
		}, //Makes docker work
		series(parallel(indexTask, htmlTask, cssTask, jsTask))
	);
}

// Browsersync Watch task
// Watch HTML file for change and reload browsersync server
// watch SCSS and JS files for changes, run scss and js tasks simultaneously and update browsersync
function bsWatchTask() {
	watch('index.html', browserSyncReload);
	watch(files.htmlPath, browserSyncReload);
	watch(
		[files.cssPath, files.jsPath], {
			interval: 1000,
			usePolling: true
		}, //Makes docker work
		series(parallel(indexTask, htmlTask, cssTask, jsTask), browserSyncReload)
	);
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(parallel(indexTask, htmlTask, cssTask, jsTask), watchTask);

// Runs all of the above but also spins up a local Browsersync server
// Run by typing in "gulp bs" on the command line
exports.bs = series(
	parallel(indexTask, htmlTask, cssTask, jsTask),
	browserSyncServe,
	bsWatchTask
);