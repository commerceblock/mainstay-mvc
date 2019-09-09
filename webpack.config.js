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
            main: './src/main.jsx'
        },
        output: {
            path: path.resolve(__dirname, './public'),
            filename: './[name].bundle.js'
        },
        optimization: {
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
            new MiniCssExtractPlugin({filename: '[name].styles.css'}),
            new htmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProgressPlugin()
        ],
        devServer: {
            contentBase: './public',
            disableHostCheck: true,
            historyApiFallback: true,
            inline: true,
            open: false,
            writeToDisk: true,
            hot: true,
            host: devServerHost,
            port: devServerPort,
            proxy: {
                '/api': `http://${serverHost}:${serverPort}`,
                '/ctrl': `http://${serverHost}:${serverPort}`
            }
        },
        devtool: 'eval-source-map'
    };
};
