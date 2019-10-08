const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlWebPackPlugin = require('html-webpack-plugin');

module.exports = () => {
    const serverHost = process.env.HOST_API || 'localhost';
    const serverPort = process.env.PORT_API || '3000';

    const devServerHost = process.env.HOST || '0.0.0.0';
    const devServerPort = parseInt(process.env.PORT) || 80;

    return {
        entry: {
            main: './src/main.jsx',
            admin: './src/admin.jsx',
        },
        output: {
            path: path.resolve(__dirname, './public'),
            filename: './[name].bundle.[hash].js'
        },
        optimization: {
            namedModules: true,
            minimizer: [new UglifyJsPlugin()],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ['babel-loader']
                },
                {
                    test: /\.html$/,
                    use: [{loader: 'html-loader'}]
                },
                {
                    test: /\.s?[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true}
                        }
                    ],
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: process.env.NODE_ENV || 'development',
                HOST_API: serverHost,
                PORT_API: serverPort,
            }),
            new MiniCssExtractPlugin({filename: '[name].styles.[hash].css'}),
            new htmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html',
                chunks: ['main']
            }),
            new htmlWebPackPlugin({
                template: './src/admin.html',
                filename: './admin.html',
                chunks: ['admin']
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProgressPlugin()
        ],
        devServer: {
            contentBase: './public',
            disableHostCheck: true,
            historyApiFallback: {
                rewrites: [
                    {
                        from: /^\/admin\/?.*$/,
                        to: 'admin.html'
                    }
                ]
            },
            inline: true,
            open: false,
            writeToDisk: true,
            hot: true,
            host: devServerHost,
            port: devServerPort,
        },
        devtool: 'eval-source-map'
    };
};
