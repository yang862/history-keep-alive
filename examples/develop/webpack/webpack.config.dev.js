const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    default: './src/default/index.js',
    'keep-alive': './src/keep-alive/index.js',
    transition: './src/transition/index.js'
  },
  output: {
    publicPath: '/',
    filename: '[name]/bundle.js',
    path: path.resolve(__dirname, '../src/public/')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../../'),
      '@keepAlive': path.resolve(__dirname, '../src/keep-alive/'),
      '@transition': path.resolve(__dirname, '../src/transition/'),
    },
  },
  devServer: {
    static: path.resolve(__dirname, '../src/public/'),
    port: 10001,
    open: false,
    hot: true,
    historyApiFallback: {
      index: '/default/index.html',
      rewrites: [
        {
          from: /^\/history-default-page(\/.*)?$/,
          to: '/default/index.html',
        },
        {
          from: /^\/history-keep-alive-page(\/.*)?$/,
          to: '/keep-alive/index.html',
        },
        {
          from: /^\/history-transition-page(\/.*)?$/,
          to: '/transition/index.html',
        },
      ]
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/default/index.html',
      chunks: ['default'],
      filename: 'default/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/keep-alive/index.html',
      chunks: ['keep-alive'],
      filename: 'keep-alive/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/transition/index.html',
      chunks: ['transition'],
      filename: 'transition/index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../../../'),
        options: {
          presets: [ "@vue/babel-preset-jsx" ],
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../src/'),
        options: {
          plugins: [
            // 解决 Uncaught ReferenceError: regeneratorRuntime is not defined 报错
            // 使用webpack-dev-server时，.babelrc的配置不生效，所以在这里再配置使之生效
            '@babel/plugin-transform-runtime',
          ]
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: [
              { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
            ],
            less: [
              { loader: 'postcss-loader' }
            ],

          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
    ]
  }
}