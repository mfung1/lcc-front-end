/*
 * CONFIGURATION
 * If you want to build files to a different directory simply modify the configuration below!
 */

const bases = {
  srcBase: "src/",
  destBase: "build/"
};

const paths = {
  // html is in build/*
  html: {
    src: bases.srcBase + "pages/**/*.njk",
    templatesSrc: bases.srcBase + "templates/",
    dest: bases.destBase,
  },
  // css is in build/assets/css/style[.min].css
  stylesheets: {
    src: bases.srcBase + "scss/main.scss",
    dest: bases.destBase + "assets/css/",
  },
  // js is in build/assets/js/*
  // external js is in build/assets/js/external/**/*.js
  js: {
    srcMain: bases.srcBase + "js/*.js",
    srcExternal: bases.srcBase + "js/external/**/*.js",
    dest: bases.destBase + "assets/js/",
  },
  // images are in build/assets/img/*
  img: {
    src: bases.srcBase + "img/**/*.{png,gif,jpg,bmp,tiff,jpeg,webp}",
    dest: bases.destBase + "assets/img/"
  },
  // other files are copied recursively to build/assets/
  other: {
    src: bases.srcBase + "other/**/*",
    dest: bases.destBase + "assets/"
  }
};

const customNunjucksEnv = {
  // functions that process the passed arguments
  filters: {},
  // globals can be either variables or functions
  globals: {}
};

module.exports = {
  bases,
  paths,
  customNunjucksEnv
}