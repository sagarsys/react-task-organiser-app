const path = require('path')
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'app'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            modifyVars: getThemeVariables({
              dark: true, // enable dark mode
              compact: true, // enable compact mode
            }),
            javascriptEnabled: true,
          },
        }],
      }
    ]
  }
}
