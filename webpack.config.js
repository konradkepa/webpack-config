const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    devServer:{     // konfiguracja webpack-dev-server'a. Skrypy w package.json: "start":"npx webpack serve"
        host: 'localhost', //host servera
        port: 3000,         // podt servera
        open: true, // otwarcie przeglądarki po odpaleniu serwera
        contentBase: path.resolve(__dirname,'public'), // ustawienie folderu na dane statyczne
    },
    entry: {
        main: "./src/index.js",                  // może być wiele punktów wejścia; teraz mam ustawiony punkt o nazwie 'main'
    },
    output: {
        path: path.resolve(__dirname,'dist'),   // __dirname - ścieżka absolutna, przejście do wyższego poziomu path.resolve(__dirname,'../','dist')
        filename: '[contenthash:4][name].bundle.js'            // [name] - name nazwa entrypoint (w tym przypadku będzie main.bundle.js)
    },
    module:{
        rules:[
            {test: /(\.png|jpe?g|gif|svg)$/i,  use: ["file-loader"] },
            {test: /\.css$/,            use: ["style-loader", "css-loader"]},
            {test: /(\.sass|scss)$/,    use: ["style-loader", "css-loader","sass-loader"]}, //kolejność loaderów ma znaczenie, pierwyszy wykonuje się jako ostatni w tablicy 
            {test: /\.css$/i,           use: [MiniCssExtractPlugin.loader, 'css-loader']},
            {test: /(\.js|jsx)$/,       use: ['babel-loader']},
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template:'src/templates/template.html', title: 'Starting page'}), //pluginy muszą być importowane za pomocą require()
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename:'[name].css'})
    ]
}