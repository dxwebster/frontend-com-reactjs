const path = require('path'); // utilizar o path para lidar com caminhos em diferentes sistemas operacionais

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'), // arquivo de entrada
    output: {
        path: path.resolve(__dirname, 'public'), // arquivo de saída
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'), // o caminho do diretório dos arquivos públicos da aplicação
    },
    module: {
        rules: [
            {
                test: /\.js$/, // toda vez que eu tiver um arquivo js 
                exclude: /node_modules/, // que não estiver na pasta node_modules
                use:{
                    loader:'babel-loader', // converta esses arquivos
                }   
            },
            {
                test: /\.css$/, // toda vez que eu tiver um arquivo css 
                exclude: /node_modules/, // que não estiver na pasta node_modules
                use:[
                    { loader:'style-loader' }, // injeta  o css dentro do html
                    { loader:'css-loader' },   // interpreta as importações que tem dentro do css
                ]  
            },
            {
                test: /.*\.(gif|png|jpe?g)$/i, // toda vez que eu tiver arquivos gif, png, jpeg, jpg 
                use:[
                    { loader:'file-loader' }, // faz o load das imagens
                ]  
            },
        ]
    },
}; 