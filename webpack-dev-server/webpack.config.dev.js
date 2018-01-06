const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
});

module.exports = {
  // absolute path for project root
  context: path.resolve(__dirname, 'src'),

  entry: [
     // relative path declaration
    './app.js',
  ],

  // Dev only
  devtool: 'inline-source-map',
  devServer: {
   // static files served from here
   contentBase: path.resolve(__dirname, "./dist/assets/media"),
   compress: true,
   // open app in localhost:2000
   port: 3000,
   stats: 'errors-only',
   open: true,
   inline: true,
   hot: true,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      // file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: 
            {
              name: '[name].[ext]',
              outputPath: './assets/media/' 
            } 
          } 
        ] 
      },
      // file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.js']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    // Dev only
    new webpack.HotModuleReplacementPlugin(),

    // extract-text-webpack-plugin instance
    extractPlugin
  ]
}