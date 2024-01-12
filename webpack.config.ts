import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';

interface Env {
    mode?: 'development' | 'production'
}

export default (env: Env) => {
    let mode = env.mode || 'development';

    const config: webpack.Configuration = {
        entry: {
            main: path.resolve(__dirname, 'src', 'index.js'),
        },   
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].js',
            clean: true,
        },
        mode: mode,
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Brainers',
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new webpack.ProgressPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: 'inline-source-map',
        devServer: {
            // static: {
            //     directory: path.join(__dirname, 'public'),
            // },
            // compress: true,
            port: 5000,
            open: true,
        }
    }

    return config
};