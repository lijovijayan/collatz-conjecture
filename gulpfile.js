const { src, dest, series } = require("gulp");
const source = require("vinyl-source-stream");
const gulp = require("gulp");
const terser = require("gulp-terser");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const browserify = require("browserify");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var stripDebug = require("gulp-strip-debug");

const conf = {
  srcdir: "./src/",
  src: "main.js",
  distdir: "./dist/",
  builddir: "./build/",
  build: "bundle.js",
  dist: "bundle.js",
  // destmin: "bundle.min.js",
};
const bundledev = () => {
  console.log("browserify development build");
  return browserify({
    entries: `${conf.srcdir + conf.src}`,
    debug: true,
  })
    .bundle()
    .pipe(source(conf.build))
    .pipe(gulp.dest(conf.builddir));
};
const stripdebug = () => {
  console.log("stripping console logs");
  return src(conf.srcdir + conf.src)
    .pipe(stripDebug())
    .pipe(gulp.dest("dist"));
};
const bundle = () => {
  console.log("browserify production build");
  return browserify({
    entries: `${conf.srcdir + conf.src}`,
    debug: false,
  })
    .bundle()
    .pipe(source(conf.dist))
    .pipe(gulp.dest(conf.distdir));
};
const babelBuild = () => {
  console.log("running Babel compiler");
  return src(conf.distdir + conf.dist)
    .pipe(babel())
    .pipe(rename(conf.dist))
    .pipe(dest(conf.distdir));
};
const es = () => {
  console.log("running gulp-terser js minimizer");
  return gulp
    .src(conf.distdir + conf.dist)
    .pipe(terser())
    .pipe(gulp.dest(conf.distdir));
};
// gulp.task("devserve", function () {
//   bundledev();
//   series(
//     bundledev(),
//     browserSync.init({
//       server: {
//         baseDir: "./",
//       },
//     })
//   );
//   gulp
//     .watch([
//       "./**/*.js",
//       "!./**/*.html",
//       "!./**/*.css",
//       "!./dist/*",
//       "!./build/*",
//       "!./node_modules/*",
//     ])
//     .on("change", series(bundledev, reload));
//   gulp.watch(["!./**/*.html", "!./**/*.css"]).on("change", reload);
// });
const startserver = () => {
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
};
exports.build = series(stripdebug, bundle, babelBuild, es);
exports.serve = series(bundledev, startserver);
