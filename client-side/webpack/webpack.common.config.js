const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')


// console.log("dirname:- ",__dirname);

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  rules: [
    // JavaScript  npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-env @babel/plugin-proposal-class-properties
    // add .babelrc file 
    // {
    // "presets": ["@babel/preset-env"],
    // "plugins": ["@babel/plugin-proposal-class-properties"]
    // }
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    // Images  import example from './images/example.png'
    {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
    },
    // Fonts and SVGs  import example from './images/example.svg'
    {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
    },
    // CSS, PostCSS, and Sass  import './styles/main.scss'
    // npm i -D sass-loader postcss-loader css-loader style-loader postcss-preset-env node-sass
    {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    },
  ],
  plugins: [
      // webpack-plugin - Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'), // template file
      filename: 'index.html', // output file
    }),
    //clean-webpack-plugin - Remove/clean build folders
    new CleanWebpackPlugin(),
    // ESLint configuration
    new ESLintPlugin({
        files: ['.', 'src', 'config'],
        formatter: 'table',
    }),
    // Prettier configuration
    new PrettierPlugin(),
  ],
}