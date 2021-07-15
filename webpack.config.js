const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
    name: 'portpolio',
    mode: isDevelopment ? 'development' : 'production',
    devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        // 상대경로 => 절대경로
        modules: [path.join(__dirname, 'src'), 'node_modules'],
    },
    entry: {
        app: './src/index',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: { browsers: ['last 2 chrome versions'] },
                                debug: isDevelopment,
                            },
                        ],
                        '@babel/preset-react',
                    ],
                    env: {
                        development: {
                            plugins: [require.resolve('react-refresh/babel')],
                        },
                    },
                },
                exclude: path.join(__dirname, 'node_modules'),
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: './build/images',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                loader: 'url-loader',
                options: {
                    publicPath: './build/images',
                    name: '[name].[ext]',
                    limit: 10000,
                },
            },
        ],
    },
    plugins: [new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' })],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/build/',
    },
    devServer: {
        historyApiFallback: true, // react router
        port: 3000,
        publicPath: '/build/',
        contentBase: './public',
    },
};

if (isDevelopment && config.plugins) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}
if (!isDevelopment && config.plugins) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

module.exports = config;
