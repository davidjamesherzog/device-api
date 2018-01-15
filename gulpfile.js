const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));  
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', () => {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('server', () => {

  nodemon({
    script: './dist/index.js',
    ext: 'js',
    env: {
      PORT: 3000
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', () => {
    console.log('Restarting');
  });
});

gulp.task('default', ['watch', 'assets', 'server']);
