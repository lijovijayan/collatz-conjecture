const { src, dest, series } = require("gulp");
const source = require("vinyl-source-stream");
const gulp = require("gulp");
const terser = require("gulp-terser");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const browserify = require("browserify");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

const conf = {
  srcdir: "./src/",
  src: "main.js",
  destdir: "./dist/",
  builddir: "./build/",
  build: "./dist/",
  dest: "bundle.js",
  // destmin: "bundle.min.js",
};
const bundle = () => {
  console.log("browserify production build");
  return browserify({
    entries: `${conf.srcdir + conf.src}`,
    debug: false,
  })
    .bundle()
    .pipe(source(conf.dest))
    .pipe(gulp.dest(conf.destdir));
};
const bundledev = () => {
  console.log("browserify development build");
  return browserify({
    entries: `${conf.srcdir + conf.src}`,
    debug: true,
  })
    .bundle()
    .pipe(source(conf.dest))
    .pipe(gulp.dest(conf.destdir));
};
const babelBuild = () => {
  console.log("running Babel compiler");
  return src(conf.destdir + conf.dest)
    .pipe(babel())
    .pipe(rename(conf.dest))
    .pipe(dest(conf.destdir));
};
const es = () => {
  console.log("running gulp-terser js minimizer");
  return gulp
    .src(conf.destdir + conf.dest)
    .pipe(terser())
    .pipe(gulp.dest(conf.destdir));
};
gulp.task("serve", function () {
  bundledev();
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp
    .watch([
      "./**/*.js",
      "!./**/*.html",
      "!./**/*.css",
      "!./dist/*",
      "!./build/*",
      "!./node_modules/*",
    ])
    .on("change", series(bundledev, reload));
  gulp.watch(["!./**/*.html", "!./**/*.css"]).on("change", reload);
});
exports.build = series(bundle, babelBuild, es);
