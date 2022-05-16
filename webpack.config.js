const webpack = require('webpack');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = function () {

    const outputDir = path.resolve(__dirname, "dist", "browser");

    return {
        entry: {
            'index': `./src/testbed/browser.tsx`,
        },
        output: {
            globalObject: 'self',
            filename: "[name].bundle.js",
            path: outputDir,
        },
    
        mode: "development",
    
        // Enable sourcemaps for debugging webpack's output.
        devtool: "inline-source-map",

        target: "web",
    
        devServer: {
            static: {
                directory: outputDir,
            },
            hot: false,
        },
    
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
    
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
    
                {
                    test: /\.ttf$/,
                    use: ['file-loader']
                },
    
                { 
                    test: /\.tsx?$/, 
                    loader: "ts-loader", 
                    options: { transpileOnly: true },
                },
    
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ]
        },
    
        plugins: [
    
            new webpack.EnvironmentPlugin({
                // Configure environment variables here.
                ENVIRONMENT: "browser",
            }),
    
            new ForkTsCheckerWebpackPlugin(),
            new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),        
    
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: `./src/testbed/browser.html`,
                        to: outputDir,
                    },
                ],
            }),
        ],
    };
}