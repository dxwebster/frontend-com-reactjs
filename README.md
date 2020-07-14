# 🔖  Sobre
Esse é um exemplo de como utilizar o ReactJS em conjunto com o back-end já criado e o Insomnia para criar uma aplicação que lista projetos ao apertar um botão.

# Funcionalidades da aplicação

- Listagem de projetos 
- Cadastro de novos projetos
- Exclusão de um projeto

# 🚀 Tecnologias utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias

- ReactJS
- Babel
- Webpack
- Style e CSS Loaders
- File Loader

# 🗂 Como criar essa aplicação do zero
Abaixo você vai encontrar todas a informações de como criar essa aplicação do zero. Vamos utilizar o projeto [Backend-com-NodeJS](https://github.com/dxwebster/Backend-com-NodeJS). Abrir a pasta backend e executar o `yarn dev` para manter o servidor rodando. 

Criar uma pasta 'frontend' que vai conter nossa aplicação.

Iniciar o node na pasta (cria o arquivo 'package.json'): `yarn init -y`

## Instalação das bibliotecas

**Instalar o ReactJS**: `yarn add react rect-dom`

**Instalar o Axios**: `yarn add axios`

**Instalar o Webpack**: `yarn add webpack webpack-cli`

**Instalar o Webpack Dev Server**: `yarn add webpack-dev-server -D`

**Instalar o Babel**: `yarn add babel-loader`

**Instalar plugins do Babel**: `yarn add @babel/core @babel/preset-env @babel/preset-react @babel/cli @babel/plugin-transform-runtim`

**Instalar o Loader de Estilos**: `yarn add style-local css-loader`

**Instalar o Loader de Arquivos**: `yarn add file-loader`

## Configuração do Axios
Nossa aplicação frontend, e criar uma nova pasta chamada 'services' e um arquivo api.js. Vamos importar o axios que vai fazer as chamadas api e conectar o front com o back.

```js
import axios from 'axios';

//  No arquivo api, indicamos em qual porta nosso back-end está funcionando, neste caso na porta 3333.
const api = axios.create({ baseURL: 'http://localhost:3333' });
 
export default api;
```

## Configuração do Babel
Para utilizar o Babel, precisamos fazer algumas configurações no arquivo babel.config.js

```js
module.exports = {
    presets: [
        '@babel/preset-env', //converte o código do js moderno para um mais antigo baseado no ambiente 
        '@babel/preset-react' // adicona as funcionalidades do react na conversão
    ],
    plugins:[
        '@babel/plugin-transform-runtime'
    ]
};
```

## Configuração do Webpack
O webpack vai executar de maneira automática, todos os loaders (babel, css, files) que fazem as conversões de arquivos para que nossa aplicação funcione corretamente em qualquer ambiente. Ele gera o arquivo bundle.js que contém todas essas execuções. Além disso, o Webpack Dev Server adiciona um Live Reloading ao ambiente de desenvolvimento para que, quando tiver alterações no código, o navegador possa ser atualizado automaticamente. Na raiz da aplicação vamos criar um arquivo chamado 'webpack.config.js':

```js
const path = require('path'); // path para lidar com caminhos em diferentes SO.

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'), // arquivo de entrada
    output: {
        path: path.resolve(__dirname, 'public'), // arquivo de saída
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'), // arquivos públicos 
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
```

## Executando o Webpack
Vamos rodar nossa aplicação pelo o comando `yarn webpack-dev-server --mode development`.
A partir de agora, a aplicação será visualizada no navegador pelo endereço: <localhost:8080>

## Primeiros códigos
Com tudo instalado e devidamente configurado, vamos começar a escrever os primeiros códigos da aplicação.
Na raíz, criar as pastas 'src' e 'public'. Na pasta public, criar o arquivo index.html.

Criar a estrutura html5 básica com uma div '#app' dentro do body e depois chamar um script chamado bundle.js. Vai ficar assim:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReactJS</title>
</head>
<body>
    <div id="app"></div>
    <script src="bundle.js"></script>
</body>
</html>
```

## Criação de componentes
Vamos criar uma pasta 'components' dentro da 'src' e um arquivo chamado Header.js.

```js
import React from 'react';

function Header({ title }) {
    return (
       <header>
           <h1>{title}</h1>
       </header>
    );
}

export default Header;
```

Agora vamos, criar dois arquivos na pasta src, o 'App.js' e 'index.js'.
O index.js, vamos escrever os códigos que vão importar um componente App que vamos criar no 'App.js':

```js
import React from 'react';
import { render } from 'react-dom';

import App from './App';

render(<App />, document.getElementById('app'));
```

O arquivo App.js conterá nosso componente que centraliza a aplicação. As primeiras linhas de código tem a função de importar tudo que vamos utilizar na aplicação

```jsx
import React, { useState, useEffect } from 'react'; // importa o react
import api from './services/api'; // importa a api que contém o axios para conectar com o bak-end
import './App.css'; // importa o css
import Header from './components/Header'; // importa o component Header
```

As próximas linhas terão nosso component App:

```js
function App(){
    const [projects, setProjects] = useState([]); 
    
    // Assim que o componente App é exibido, dispara a função get para buscar as informações do back-end	
    useEffect(() => {
        api.get('projects').then(response =>{ 
            setProjects(response.data); // recebe as informações vindas do back-end
        });
    }, []);
    
    // Adiciona novo projeto
    async function handleAddProject(){       
        const response = await api.post('projects', {
            title: `Front-end com ReactJS ${Date.now()}`,
            owner: "Adriana Lima"
        })
        const newProject = response.data;
        setProjects([...projects, newProject]);
    }

    // Deleta um projeto
    async function handleRemoveProject(id) {
        await api.delete(`projects/${id}`);      
        const newProjects = projects.filter( 
         project => project.id !== id 
        )    
        setProjects(newProjects);
    }
   
    return(
        <>
        <Header title='Projects'/>        
        <ul>
            {projects.map(project =>
                <li key={project.id}>
                    {project.title}
                    <button onClick={() => handleRemoveProject(project.id)}> Remover</button>
                </li>
             )} 
        </ul>
       
        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;
```

## Exibição na tela
- Para incluir um novo projeto (pelo app), clicar no botão "Adicionar Projeto"
- Quando aperta o botão remover, deleta um projeto

<img src="https://ik.imagekit.io/dxwebster/Untitled_m1Upqgswo.png"/>

## Visualizando no Insomnia

- Pelo insomnia, podemos acompanhar o funcionamento da inclusão e remoção de projetos.
- Cada vez que aperta o botão adicionar ou remover projeto, modifica a lista do  back-end

<img src="https://ik.imagekit.io/dxwebster/Untitled__1__Unamo-Qpo.png"/>
