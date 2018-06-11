var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Converts sass into css, prevents errors and adds vender prefix
gulp.task('styles', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css/'))
        .pipe(reload({stream:true}));
});

// Move the javascript files into our js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("js"))
        .pipe(browserSync.stream());
});

// reload server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('scss/**/*.scss',['styles']);
    gulp.watch("*.html", ['bs-reload']);
    gulp.watch("src/**/*.js", ['bs-reload']);
});

// deploys
gulp.task('default',  ['js','styles','browser-sync','watch']);
