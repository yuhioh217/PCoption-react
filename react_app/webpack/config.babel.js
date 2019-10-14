import path from "path";
import webpack from "webpack";

export default {
  mode: "", // 'production' for production
  devtool: "eval-source-map", // 'source-map' for production
  entry: [
    "webpack-hot-middleware/client?reload=true",
    //?reload=true part instructs the middleware to auto-reload the
    //page when Webpack gets stuck. Remember to remove it when using production versino
    path.join(process.cwd(), "src/index")
  ],
  output: {
    filename: "bundle.js",
    path: path.join(process.cwd(), "public", "assets"),
    publicPath: "/assets"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    /***
    new webpack.optimize.OccurrenceOrderPlugin(true), 
    new webpack.optimize.UglifyJsPlugin(), ==> for production
    ***/
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["transform-inline-environment-variables"]
          }
        },
        exclude: /node_modules/
      },
      {
        type: "javascript/auto",
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.svg$/,
        use: "svg-inline-loader"
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: "file-loader"
      },
      {
        test: /\.(s)?css$/, // <-- note this (s)?
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: "eslint-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|gif|png)$/,
        use: "url-loader"
      }
    ]
  },
  target: "web"
};
