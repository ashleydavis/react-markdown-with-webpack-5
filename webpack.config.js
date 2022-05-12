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

            fallback: {
                // Allows the path Node.js module to be used in Weback bundled code.
                "path": require.resolve("path-browserify"),
            },
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
            
            // For React-markdown + Web pack 5
            // https://github.com/remarkjs/remark/discussions/903
            // https://stackoverflow.com/a/64553486/25868
            // https://github.com/remarkjs/react-markdown/issues/652
            // https://stackoverflow.com/a/65018686/25868
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
    
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