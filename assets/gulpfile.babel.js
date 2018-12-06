import gulp from 'gulp';
import sass from 'gulp-sass';
import nunjucks from 'gulp-nunjucks-render';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import del from 'del';
import gulpif from 'gulp-if';

browserSync.create();

const paths = {
	build: '../public/assets/',
	from: {
		css: './scss/**/*{.css,.scss,.sass}',
		tpl: '../templates/**/!(base|_*){.njk,.nunjucks}',
		files: [
			'./images/**/*{.jpg,.png,.svg,.jpeg}',
			'./fonts/**/*{.eot,.otf,.woff,.woff2,.ttf,.svg}'
		],
		uploads: './uploads/**/*{.jpg,.png,.svg,.jpeg,.pdf,.xls,.docx}'
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
			index: 'home.html'
		},
		open: false
	});
	browserSync.watch('../public', browserSync.reload);
};

export const watch = () => {
	gulp.watch(paths.from.css, gulp.series(css));
	gulp.watch('../templates/**/*.njk', gulp.series(tpl));
	gulp.watch(paths.from.files, gulp.series(files));
	gulp.watch(paths.from.uploads, gulp.series(uploads));
};

export const clean = cb => {
	return del(paths.build, { force: true })
};

export const files = () => {
	return gulp.src(paths.from.files, { base: './' })
		.pipe(gulp.dest(paths.build))
};

export const uploads = () => {
	return gulp.src(paths.from.uploads, { base: './' })
		.pipe(gulp.dest(paths.to.uploads))
};

export const dev = gulp.series(gulp.parallel(css, tpl, files, uploads), gulp.parallel(watch, sync));

export const prod = gulp.series(gulp.parallel(css, tpl, files, uploads));

export default dev;