const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // To automatically include css files
const CopyWebpackPlugin = require('copy-webpack-plugin'); // To automatically copy assets directory
const HtmlWebpackPlugin = require('html-webpack-plugin'); // To automatically include main script
const fs = require('fs');

module.exports = {
    entry: {
        main: './src/js/main.js', // Shared JS logic
        index: './src/js/index.js',
        about: './src/js/about.js',
        contact: './src/js/contact.js',
    },
    output: {
        filename: 'js/[name].js', // If you have a js file per html page [name] will be replaced with entry names (e.g., index.bundle.js)
        path: path.resolve(__dirname, 'dist'), // Set build folder for deployment
        clean: true, // Clean the output directory before every build
    },
    module: {
        rules: [
            {
                test: /\.css$/, // regex for css file types
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS instead of injecting
            },
            {
                test: /\.html$/,
                use: 'html-loader', // This loader imports HTML as a string
            },
        ],
    },
    plugins: [
        new ESLintPlugin({
            // Optional: Specify your ESLint configuration file or other options
            extensions: ['js'], // Specify file extensions to lint
            overrideConfigFile: path.resolve(__dirname, 'eslint.config.js'), // Explicitly specify the ESLint config file
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css', // Output CSS file per entry
        }),

        new HtmlWebpackPlugin({
            template: './src/templates/base.ejs', // Set the html template file to use
            filename: 'index.html',
            chunks: ['main', 'index'], // Include shared JS which includes page-specific CSS
            // Template parameters that we made
            templateParameters: {
                title: 'Home Page',
                content: fs.readFileSync(path.resolve(__dirname, 'src/pages/index.html'), 'utf-8'), // Import the content of index.html as a string
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/base.ejs',
            filename: 'about.html',
            chunks: ['main', 'about'], // Include shared JS which includes page-specific CSS
            // Template parameters that we made
            templateParameters: {
                title: 'About Page',
                content: fs.readFileSync(path.resolve(__dirname, 'src/pages/about.html'), 'utf-8'), // Import the content of index.html as a string
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/base.ejs',
            filename: 'contact.html',
            chunks: ['main', 'contact'], // Include shared JS which includes page-specific CSS
            // Template parameters that we made
            templateParameters: {
                title: 'Contact Page',
                content: fs.readFileSync(path.resolve(__dirname, 'src/pages/contact.html'), 'utf-8'), // Import the content of index.html as a string
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'), // Copy assets folder
                    to: 'assets', // Output to 'dist/assets'
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'), // Serve files from `src` folder in development
        },
        port: 9000,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' }, // Redirect root to index.html
                { from: /^\/about/, to: '/about.html' }, // Redirect /about to about.html
                { from: /^\/contact/, to: '/contact.html' }, // Redirect /contact to contact.html
                { from: /^\/main/, to: '/main.html' }, // Redirect /main to main.html
            ],
        },
    },
};
