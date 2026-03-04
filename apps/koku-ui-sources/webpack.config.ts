import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserJSPlugin from 'terser-webpack-plugin';
import type { Configuration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

const NODE_ENV = (process.env.NODE_ENV || 'development') as Configuration['mode'];

const config: Configuration & {
  devServer?: WebpackDevServerConfiguration;
} = {
  mode: NODE_ENV,
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  devServer: {
    host: 'localhost',
    port: 9010,
    historyApiFallback: true,
    open: NODE_ENV !== 'production',
    static: [
      {
        directory: path.resolve(__dirname, 'dist'),
      },
    ],
    client: {
      overlay: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules\/(?!@koku-ui)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
        include: [
          path.resolve(__dirname, '../../node_modules/@patternfly/react-core/dist/styles/assets/fonts'),
          path.resolve(__dirname, '../../node_modules/@patternfly/patternfly/assets/fonts'),
          path.resolve(__dirname, '../../node_modules/@patternfly/patternfly/assets/pficon'),
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        type: 'asset/resource',
        include: [
          path.resolve(__dirname, '../../node_modules/@patternfly/patternfly/assets/images'),
          path.resolve(__dirname, '../../node_modules/@patternfly/react-core/dist/styles/assets/images'),
        ],
      },
    ],
  },
  output: {
    filename: '[name].bundle-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].bundle-[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    symlinks: false,
    alias: {
      '@koku-ui/ui-lib': path.resolve(__dirname, '../../libs/ui-lib/src'),
      '@koku-ui/onprem-cloud-deps': path.resolve(__dirname, '../../libs/onprem-cloud-deps/src'),
      '@redhat-cloud-services/frontend-components': path.resolve(
        __dirname,
        '../../libs/onprem-cloud-deps/src/frontend-components'
      ),
      '@redhat-cloud-services/frontend-components-notifications': path.resolve(
        __dirname,
        '../../libs/onprem-cloud-deps/src/frontend-components-notifications'
      ),
      '@unleash/proxy-client-react': path.resolve(
        __dirname,
        '../../libs/onprem-cloud-deps/src/unleash/proxy-client-react'
      ),
    },
  },
  watchOptions: {
    followSymlinks: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

if (NODE_ENV === 'production') {
  (config.optimization || {}).minimizer = [
    new TerserJSPlugin({}),
    new CssMinimizerPlugin({
      minimizerOptions: {
        preset: ['default', { mergeLonghand: false }],
      },
    }),
  ];
  config.plugins?.push(
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[name].bundle-[contenthash].css',
    })
  );
  config.devtool = 'source-map';
}

export default config;
