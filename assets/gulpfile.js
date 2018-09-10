let path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    flatten = require('gulp-flatten'),
    fs = require('fs'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    //nunjucks = require('gulp-nunjucks'),
    nunjucksRender = require('gulp-nunjucks-render'),
    data = require('gulp-data'),
    browserSync = require('browser-sync').create();

let settings = {
    scsso: {},
    sass: {},
    paths: {
        templates: [
            '!../templates/base.njk',
            '!../templates/**/_*.+(html|njk)',
            '../templates/**/*.+(html|njk)'
        ],
        images: './images/**/*{.jpg,.png,.svg}',
        fonts: './fonts/**/*{.eot,.otf,.woff,.woff2,.ttf,.svg}',
        css: './scss/**/*.scss'
    },
    dst: {
        build: '../public/',
        css: '../public/css',
        images: '../public/images',
        fonts: '../public/fonts',
        templates: '../public',
    }
};

gulp.task('fonts', () => {
    return gulp.src(settings.paths.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(settings.dst.fonts));
});

gulp.task('images', () => {
    return gulp.src(settings.paths.images)
        .pipe(gulp.dest(settings.dst.images))
        .pipe(browserSync.stream());
});

gulp.task('css', ['fonts'], () => {
    return gulp.src(settings.paths.css)
        .pipe(plumber())
        .pipe(sass(settings.sass).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(concat('app.css'))
        .pipe(csso(settings.scsso))
        .pipe(gulp.dest(settings.dst.css))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['templates'], () => {
    browserSync.init({
        server: {
            baseDir: ('../public/'),
            index: "index.html",
            // Static routes
            routes: {
                "/bower_components": "bower_components"
            }
        },
        open: false,
    });

    watch('../public/js/**/*.js', () => {
        browserSync.reload();
    });
    watch([].concat(settings.paths.css, settings.paths.fonts), () => {
        gulp.start('css');
    });
    watch('../templates/**/*.+(html|njk)', () => {
        gulp.start('templates');
        browserSync.reload();
    });
});

gulp.task('clean', cb => {
    return del(settings.dst.build, { force: true });
});

gulp.task('templates', () => {
    return gulp.src(settings.paths.templates)
        .pipe(plumber())
        .pipe(nunjucksRender({
            path: ['../templates']
        }))
        .pipe(gulp.dest(settings.dst.templates));
});

gulp.task('default', () => {
    return gulp.start('css', 'images', 'templates');
});
