module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css",
    })
);
