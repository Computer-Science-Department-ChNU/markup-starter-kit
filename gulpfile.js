import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import gulpPug from 'gulp-pug';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';

const sass = gulpSass(dartSass);

const paths = {
  scss: 'src/scss/**/*.scss',
  pug: 'src/pug/**/*.pug',
  images: 'src/images/**/*',
  dist: 'dist/',
};

export function scssTask() {
  return gulp.src(paths.scss)
    .pipe(plumber())
    .pipe(sass(undefined, undefined).on('error', sass.logError))
    .pipe(gulp.dest(`${paths.dist}/css`))
    .pipe(browserSync.stream());
}

export function pugTask() {
  return gulp.src(paths.pug)
    .pipe(plumber())
    .pipe(gulpPug())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
}

export function imagesTask() {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest(`${paths.dist}/images`));
}

export function serveTask() {
  browserSync.init({
    server: {
      baseDir: paths.dist,
    },
    open: false,
  });

  gulp.watch(paths.scss, scssTask);
  gulp.watch(paths.pug, pugTask);
  gulp.watch(paths.images, imagesTask);
  gulp.watch(paths.dist).on('change', browserSync.reload);
}

export default gulp.series(scssTask, pugTask, imagesTask, serveTask);
