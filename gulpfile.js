const gulp = require('gulp');


const {copyOther, cleanDist} = require('./gulp/helpers/helpers.js');
const {initBrowserSync, reload} = require('./gulp/helpers/browserSync.js');
const {css, jsMain, jsExternal, html, images} = require('./gulp/tasks/processAssets.js');
const {watchCss, watchHtml, watchJsMain, watchJsExternal, watchOther} = require('./gulp/watchers/watchers.js');


/*
 * EXPORTED TASKS
 */
exports.css = css;
exports.js = gulp.parallel(jsMain, jsExternal);
exports.html = html;
exports.images = images;
exports.other = copyOther;
exports.build = gulp.parallel(css, jsMain, jsExternal, html, images, copyOther);
exports.watch = gulp.parallel(watchCss, watchJsMain, watchJsExternal, watchHtml, watchOther);
exports.clean = cleanDist;
exports.reload = reload;
exports.default = gulp.series(
  exports.clean,
  exports.build,
  gulp.parallel(
    exports.watch,
    initBrowserSync
  )
);
