const ghpages = require("gh-pages");
var fs = require("fs");

const appPath = "dist/";
const domain = "https://lijovijayan.github.io/collatz-conjecture";

// setting up 404 page
fs.writeFile(
  `${appPath}404.html`,
  `<meta http-equiv="refresh" content="0; url=${domain}" />`,
  function (err) {
    console.log(err);
  }
);

ghpages.publish(appPath, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`application is published at ${domain}`);
  }
});
