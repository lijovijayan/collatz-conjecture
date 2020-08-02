const gulp = require("gulp");
const webpack = require("webpack");
const BrowserSync = require("browser-sync");

const DIST_DIR = "./dist";
const BUILD_DIR = "./build";
const SRC_DIR = "./app";
let DIR = "";
let CONFIG;
const browsersync = BrowserSync.create();
const webpackConfigProd = require("./webpack.prod.js");
const webpackConfigDev = require("./webpack.dev.js");
gulp.task("copy:html", () => {
  return gulp.src(`${SRC_DIR}/template/index.html`).pipe(gulp.dest(DIR));
});

gulp.task("copy:css", () => {
  return gulp.src(`${SRC_DIR}/template/main.css`).pipe(gulp.dest(DIR));
});
gulp.task("webpack:build", () => {
  return new Promise((resolve, reject) => {
    webpack(CONFIG, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join("\n")));
      }
      resolve();
    });
  });
});

gulp.task("conf:prod", (task) => {
  DIR = DIST_DIR;
  CONFIG = webpackConfigProd;
  return task();
});

gulp.task("conf:dev", (task) => {
  DIR = BUILD_DIR;
  CONFIG = webpackConfigDev;
  return task();
});
gulp.task("server:start", () => {
  browsersync.init({
    server: {
      baseDir: "./build",
    },
  });
  gulp
    .watch([
      "./**/*.js",
      "./**/*.html",
      "./**/*.css",
      "!./dist/*",
      "!./build/*",
      "!./node_modules/*",
    ])
    .on(
      "change",
      gulp.series(
        "conf:dev",
        "copy:html",
        "copy:css",
        "webpack:build",
        browsersync.reload
      )
    );
});

gulp.task(
  "build",
  gulp.series("conf:prod", "copy:html", "copy:css", "webpack:build")
);
gulp.task(
  "serve",
  gulp.series(
    "conf:dev",
    "copy:html",
    "copy:css",
    "webpack:build",
    "server:start"
  )
);
