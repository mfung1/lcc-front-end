const browserSync = require('browser-sync'),
      {bases} = require('../../config/gulp.config');

/*
 * BROWSER SYNC
 */
const initBrowserSync = () => {
  browserSync.init({
    server: {
      baseDir: bases.destBase,
      directory: true
    },
    reloadDelay: 350,
    files: [`${bases.destBase}/**/*.*`]
  });
}

const reload = (done) => {
  browserSync.reload({ stream: false });
  done();
}

module.exports = {initBrowserSync, reload}