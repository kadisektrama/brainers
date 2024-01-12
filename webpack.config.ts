import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

interface Env {
    mode?: 'development' | 'production'
}

export default (env: Env) => {
    let isDev = env.mode === 'development';
    let mode = env.mode || 'development';

    let moduleCssLoader = {
        loader: 'css-loader',
        options: {
            modules: true
        },
    }

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
            !isDev && new WebpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
            isDev && new ReactRefreshPlugin()
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, moduleCssLoader, "sass-loader"],
                },
                {
                    test: /\.css$/i,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, moduleCssLoader],
                },
                // {
                //     test: /\.tsx?$/,
                //     use: 'ts-loader',
                //     exclude: /node_modules/,
                // },
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: require.resolve('ts-loader'),
                            options: {
                                getCustomTransformers: () => ({
                                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                                }),
                                transpileOnly: isDev,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),  
            },
        },
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? {
            // static: {
            //     directory: path.join(__dirname, 'public'),
            // },
            // compress: true,
            port: 5000,
            open: true,
            historyApiFallback: true,
            hot: true,
        } : undefined
    }

    return config
};