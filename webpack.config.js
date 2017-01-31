module.exports = {
  devtool: "source-map",
  entry: "./src/main.ts",
  output: {
    filename: "./main.js",
    pathinfo: true,
    libraryTarget: "commonjs2",
    sourceMapFilename: 'map.json', // normally this is [file].map, but we need a js file, or it will be rejected by screeps server.
    devtoolModuleFilenameTemplate: '[resource-path]',
  },

  externals: [
    { "map": "map" },
    { "allrounder": "allrounder" },
    { "harvester-energy": "harvester-energy" }
  ],

  target: "node",

  node: {
    console: true,
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.js', '.ts', '.d.ts', '.tsx']
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
};