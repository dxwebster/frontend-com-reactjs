module.exports = {
    presets: [
        '@babel/preset-env', //converte o código do js moderno para um mais antigo, baseado no ambiente (enviroment) da aplicação (ex: funcionalidades ou versões dos browsers)
        '@babel/preset-react' // adicona as funcionalidades do react na conversão
    ],
    plugins:[
        '@babel/plugin-transform-runtime'
    ]
};