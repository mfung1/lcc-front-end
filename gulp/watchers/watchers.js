const gulp = require('gulp');
const {css, jsMain, jsExternal, html, copyOther} = require('../tasks/processAssets');
const {bases} = require('../../config/gulp.config');

/*
 * WATCHERS
 */
const watchCss = () => {
  return gulp.watch(`${bases.srcBase}scss/**/*.scss`, css);
}

const watchJsMain = () => {
  return gulp.watch(`${bases.srcBase}js/*.js`, jsMain);
}

const watchJsExternal = () => {
  return gulp.watch(`${bases.srcBase}js/external/*.js`, jsExternal);
}

const watchHtml = () => {
  return gulp.watch([`${bases.srcBase}pages/**/*.njk`, `${bases.srcBase}templates/**/*.njk`], html);
}

const watchOther = () => {
  return gulp.watch(`${bases.srcBase}other/**/*`, copyOther);
}

module.exports = {
  watchCss,
  watchJsMain,
  watchJsExternal,
  watchHtml,
  watchOther
};