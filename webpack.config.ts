import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface Env {
    mode?: 'development' | 'production'
}

export default (env: Env) => {
    let isDev = env.mode === 'development';
    let mode = env.mode || 'development';

    const config: webpack.Configuration = {
        entry: {
            main: path.resolve(__dirname, 'src', 'index.tsx'),
        },   
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].js',
            clean: true,
        },
        mode: mode,
        plugins: [
            !isDev && new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[name].[hash].[id].css',
            }),
            new HtmlWebpackPlugin({
                title: 'Brainers',
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            isDev && new webpack.ProgressPlugin(),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                },
                {
                    test: /\.css$/i,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"],
                },
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
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? {
            // static: {
            //     directory: path.join(__dirname, 'public'),
            // },
            // compress: true,
            port: 5000,
            open: true,
        } : undefined
    }

    return config
};