import gulp from 'gulp';
import sass from 'gulp-sass';
import nunjucks from 'gulp-nunjucks-render';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import del from 'del';
import gulpif from 'gulp-if';
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';
import spritesmith from 'gulp.spritesmith';

browserSync.create();

const paths = {
	build: [
		'../public/assets/',
		'../public/**/*.html'
	],
	from: {
		css: './scss/**/*.scss',
		tpl: '../templates/**/!(base|_*){.njk,.nunjucks}',
		files: [
			'./images/**/*',
			'!./images/sprite{/**,}',
			'./fonts/**/*'
		],
		sprite: [
			'./images/sprite/**/*.svg',
			'./images/sprite/**/*.png'
		],
		uploads: './uploads/**/*'
	},
	to: {
		css: '../public/assets/css',
		tpl: '../public',
		uploads: '../public'
	}
};

export const css = () => {
	return gulp.src(paths.from.css)
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false,
			grid: true
		}))
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.write()))
		.pipe(gulp.dest(paths.to.css))
};

export const tpl = () => {
	return gulp.src(paths.from.tpl)
		.pipe(nunjucks({path: ['../templates']}))
		.pipe(gulp.dest(paths.to.tpl))
};

export const sync = () => {
	browserSync.init({
		server: {
			baseDir: '../public',
			index: 'index.html'
		},
		open: false
	});
	browserSync.watch('../public', browserSync.reload);
};

export const watch = () => {
	gulp.watch(paths.from.css, gulp.series(css));
	gulp.watch('../templates/**/*.njk', gulp.series(tpl));
	gulp.watch(paths.from.sprite, gulp.series(sprite));
	gulp.watch(paths.from.files, gulp.series(files));
	gulp.watch(paths.from.uploads, gulp.series(uploads));
};

export const clean = cb => {
	return del(paths.build, { force: true })
};

export const sprite = () => {
	// svg with fill
	let svgFill = gulp.src('./images/sprite/fill/*.svg')
		.pipe(svgSprite({
			mode: {
				symbol: {
					dest : '.',
					sprite: 'images/sprite-fill.svg',
					render: {
						scss: {
							dest: 'scss/sprite/svg/fill/_variables.scss',
							template: 'scss/sprite/svg/fill/template.mustache'
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('./'));
	// clean svg
	let svg = gulp.src(['./images/sprite/**/*.svg','!./images/sprite/fill{/**,}'])
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[fill-opacity]').removeAttr('fill-opacity');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>')) // У cheerio есть один баг — иногда он преобразовывает символ '>' в кодировку '&gt;'.
		.pipe(svgSprite({
			mode: {
				symbol: {
					dest : '.',
					sprite: 'images/sprite.svg',
					render: {
						scss: {
							dest: 'scss/sprite/svg/_variables.scss',
							template: 'scss/sprite/svg/template.mustache'
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('./'));
	//png
	let png = gulp.src('./images/sprite/**/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_variables.scss',
			cssFormat: 'scss',
			algorithm: 'binary-tree',
			cssTemplate: 'scss/sprite/png/template.mustache',
		}));

	png.img.pipe(gulp.dest('./images/'));
	png.css.pipe(gulp.dest('./scss/sprite/png/'));

	return svg, svgFill, png;

};

export const files = () => {
	return gulp.src(paths.from.files, { base: './' })
		.pipe(gulp.dest(paths.build[0]))
};

export const uploads = () => {
	return gulp.src(paths.from.uploads, { base: './' })
		.pipe(gulp.dest(paths.to.uploads))
};

export const dev = gulp.series(gulp.parallel(css, tpl, sprite, files, uploads), gulp.parallel(watch, sync));

export const prod = gulp.series(gulp.parallel(css, tpl, sprite, files, uploads));

export default dev;
