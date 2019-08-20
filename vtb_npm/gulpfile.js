'use strict';

const gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel'),
  cssmin = require('gulp-csso'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  postcss = require("gulp-postcss"),
  plumber = require("gulp-plumber"),
  pngquant = require('imagemin-pngquant'),
  rigger = require('gulp-rigger'),
  runSequence = require('run-sequence'),
  rimraf = require('rimraf'),
  htmlMin = require("gulp-htmlmin"),
  rename = require("gulp-rename"),
  typography = require('gulp-typograf'),
  // reload = browserSync.reload,
  sass = require('gulp-sass'),
  strip = require('gulp-strip-comments'),
  server = require('browser-sync').create(),
  sourcemaps = require('gulp-sourcemaps'),
  svgStore = require('gulp-svgstore'),
  stylelint = require('gulp-stylelint'),
  uglify = require('gulp-uglify-es').default,
  watch = require('gulp-watch'),
  webp = require("gulp-webp"),
  qualityOfImage = 65;
  // csscomb = require("gulp-csscomb");
  // sorting = require('postcss-sorting'),
  // gulpStylelint = require('gulp-stylelint');

const path = {
  src: {
    style: 'source/sass/style.scss',
    test: 'source/sass/test.scss',
    img: 'source/img/',
    fonts: 'source/fonts/',
    js: 'source/js/**/*.js',
  },

  build: {
    build: '../vtb_static',
    css: '../vtb_static/css',
    js: '../vtb_static/js',
  },

  clean: '../vtb_static/'
};


gulp.task('style', function () {
  return gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(server.stream());
});

// gulp.task('stylelint', function () {
//   return gulp.src(path.src.test)
//   .pipe(postcss([sorting({
//     "properties-order": [
//         "position",
//         "top",
//         "right",
//         "bottom",
//         "left",
//         "opacity",
//         "visibility",
//         "z-index",

//         "",

//         "display",
//         "align-items",
//         "justify-content",
//         "float",
//         "width",
//         "min-width",
//         "max-width",
//         "height",
//         "min-height",
//         "max-height",
//         "margin",
//         "padding",

//         "",

//         "font",
//         "font-family",
//         "font-size",
//         "font-weight",
//         "font-style",
//         "line-height",
//         "text-align",
//         "color",

//         "",

//         "background-color",
//         "border",
//         "border-radius",

//         "",

//         "transition",
//         "will-change",
//     ],
//     "unspecified-properties-position": "bottom"
//   })]))
  // .pipe(gulp.dest(file => {
  //   return file.base;
  // }));
// });

// gulp.task('lint-css', function lintCssTask() {
//   return gulp.src(path.src.test)
//     .pipe(gulpStylelint({
//       reporters: [
//         {formatter: 'string', console: true}
//       ]
//     }));
// });

// gulp.task('stylelint', function() {
//   return gulp.src(path.src.test)
//     .pipe(csscomb())
//     .pipe(gulp.dest(file => {
//       return file.base;
//     }));
// });

gulp.task('clean', () => {
  return del(path.clean, {
    force: true
  });
});

gulp.task('copy', () => {
  return gulp.src([
    'source/img/**',
    'source/fonts/**',
    'source/favicons/**',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest(path.build.build));
});

gulp.task('js', () => {
  return gulp.src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(rigger())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(server.stream());
});

gulp.task("build", done => {
  runSequence(
    'clean',
    'copy',
    // 'fix-css',
    // 'stylelint',
    // "lint-css",
    'style',
    'js',
    done
  );
});

gulp.task("serve", ["style"], () => {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", ["style"]);
  gulp.watch("source/js/**/*.js", ["js"]);
});
