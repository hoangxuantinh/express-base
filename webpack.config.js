var path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/server.ts',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './build'),
    }
};