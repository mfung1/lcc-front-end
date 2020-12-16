const gulp = require('gulp'),
      del = require('del'),
      {bases, paths} = require('../../config/gulp.config');

const copyOther = () => {
  return gulp.src(paths.other.src, {since: gulp.lastRun(copyOther)})
    .pipe(gulp.dest(paths.other.dest));
}

const cleanDist = () => {
  return del(bases.destBase + "**/*");
}

module.exports = {
  copyOther,
  cleanDist
}