import { join } from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
export const entry = './src/index.js';
export const output = {
    path: join(__dirname, "/dist"),
    filename: "index_bundle.js",
};
export const module = {
    rules: [
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
        {
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                },
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'css-loader',
                'sass-loader'
            ]
        }
    ],
};
export const plugins = [
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    })
];
export const resolve = {
    extensions: ['.js', '.jsx'],
};
