const gulp = require('gulp'),
      fLog = require('fancy-log'),
      ansicolors = require('ansi-colors'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      {paths, customNunjucksEnv} = require('../../config/gulp.config'),

      // gulp-uglify with uglify-es for ES6+ support
      uglifyEs = require('uglify-es'),
      composer = require('gulp-uglify/composer'),
      uglify = composer(uglifyEs, console),
      helpers = require('../helpers/helpers'),

      jshint = require('gulp-jshint'),
      header = require('gulp-header'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      cssnano = require('gulp-cssnano'),
      sourcemaps = require('gulp-sourcemaps'),
      nunjucksRender = require('gulp-nunjucks-render'),
      pkg = require('../../package.json'),
      imagemin = require("gulp-imagemin");

const banner = [
  '/*!',
  ` * ${pkg.name}`,
  ` * ${pkg.title}`,
  " *",
  ` * Url: ${pkg.url}`,
  ` * Author: ${pkg.author}`,
  ` * Copyright 2019-${new Date().getFullYear()}. ${pkg.license} licensed.`,
  ' */',
  '',
].join('\n');

/*
 * SCSS, JS and HTML preprocessing
 */
const css = () => {
  return gulp.src(paths.stylesheets.src)
    .pipe(rename("style.css"))
    .pipe(sourcemaps.init())
    // Compile scss and prefix
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    // Create two files: style.css and style.css.min
    .pipe(gulp.dest(paths.stylesheets.dest))
    // Compress css, etc.
    .pipe(cssnano())
    .pipe(rename({suffix: ".min"}))
    .pipe(header(banner))
    .pipe(sourcemaps.write())
    // Write the minified file
    .pipe(gulp.dest(paths.stylesheets.dest));
}

const jsMain = () => {
  return gulp.src(paths.js.srcMain, {since: gulp.lastRun(jsMain)})
    .pipe(concat("scripts.js"))
    .pipe(sourcemaps.init())
    // Check against .jshintrc rules
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("default"))
    // Create two files: scripts.js and scripts.js.min
    .pipe(header(banner))
    .pipe(gulp.dest(paths.js.dest))
    // minify js and log errors
    .pipe(uglify())
    .on("error", function (err) {
      fLog(ansicolors.red("[Error]]"), err.toString());
    })
    .pipe(header(banner))
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write())
    // Write the minified file
    .pipe(gulp.dest(paths.js.dest));
}

const jsExternal = () => {
  // Just copy the external js files
  return gulp.src(paths.js.srcExternal, {since: gulp.lastRun(jsExternal)})
    .pipe(gulp.dest(paths.js.dest));
}

const html = () => {
  // TODO test
  const manageEnvFn = function(env) {
    // Add filters
    for (let [key, value] of Object.entries(customNunjucksEnv.filters)) {
      env.addFilter(key, value);
    }
    // Add globals
    for (let [key, value] of Object.entries(customNunjucksEnv.globals)) {
      env.addGlobal(key, value);
    }
  };

  return gulp.src(paths.html.src, {since: gulp.lastRun(html)})
    .pipe(nunjucksRender({
      ext: ".html",
      inheritExtension: false,
      path: paths.html.templatesSrc,
      manageEnv: manageEnvFn
    }))
    .pipe(gulp.dest(paths.html.dest));
}

const images = () => {
  return gulp.src(paths.img.src)
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest(paths.img.dest));
}
module.exports = {
  css,
  jsMain,
  jsExternal,
  html,
  images
};