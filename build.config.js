({
    uglify2: {
        mangle: true
    },
    name: "require.config",
    baseUrl: ".",
    mainConfigFile: "require.config.js",
    out: "app.min.js",
    generateSourceMaps: false,
    preserveLicenseComments: false,
    wrap: true,
    optimize: "uglify2"
    //optimize: "none"

    /*dir: "../app-dist",
    modules: [
      {
        name: "app/app.js"
      }
    ]*/
    //sudo r.js -o build.config.js
    //r.js.cmd -o build.config.js
})