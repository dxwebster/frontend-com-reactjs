## 🔖  Sobre
Esse é um exemplo de como utilizar o ReactJS em conjunto com o back-end já criado e o Insomnia para criar uma aplicação que lista projetos ao apertar um botão.

## Funcionalidades da aplicação

- Cadastro de novos projetos
- Listagem de projetos
- Exclusão de um projeto

## 🚀 Tecnologias utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias

- ReactJS
- Babel
- Webpack
- Style e CSS Loaders
- File Loader

## 🗂 Como criar essa aplicação do zero
Abaixo você vai encontrar todas a informações de como criar essa aplicação do zero.
Para funcionar, o projeto Backend-com-NodeJS precisa estar pronto.

Criar uma pasta 'frontend' que vai conter nossa aplicação.

Iniciar o node na pasta (cria o arquivo 'package.json'): `yarn init -y`

## Instalação das bibliotecas

**Instalar o ReactJS** _(cria a pasta 'node_modules' e o arquivo 'package-lock.json')_: `yarn add react rect-dom`

**Instalar o Babel** _(cria o arquivo 'babel.config.js')_: `yarn add @babel/core @babel/preset-env @babel/preset-react @babel/cli`

**Instalar outro plugin do Babel**: `yarn add @babel/plugin-transform-runtime`

**Instalar o Babel-Loader**: `yarn add babel-loader`

**Instalar o Webpack**: `yarn add webpack webpack-cli`

**Instalar o Webpack Dev Server** _(cria o arquivo 'webpack.config.js')_: `yarn add webpack-dev-server -D`

**Instalar o Loader de estilos**: `yarn add style-local css-loader`

**Instalar o Loader de Arquivos**: `yarn add file-loader`

**Instalar o Axios**: `yarn add axios`

# Primeiros códigos

```jsx
import React, { useState, useEffect } from 'react'; // importa o react
import api from './services/api'; // importa a api que contém o axios para conectar com o bak-end
import './App.css'; // importa o css
import Header from './components/Header'; // importa o component Header

// Componente Aplicação
function App(){
		const [projects, setProjects] = useState([]); // carrega lista de projetos       
    
		// Dispara a função de get para buscar as informações do back-end		
		useEffect(() => { 
        api.get('projects').then(response =>{
            setProjects(response.data); // recebe as informações vindas do back-end
        });
    }, []);
    
		// Cria um novo projeto
    async function handleAddProject(){       
				const response = await api.post('projects', {
            title: "Front-end com ReactJS",
            owner: "Adriana Lima"
        })
        const newProject = response.data; // armazena os novos valores na variável newProject
				setProjects([...projects, newProject]);// cria um novo array com a lista de projects já existente e a nova lista
    }
		
		// Deleta um projeto
		async function handleRemoveProject(id) {
        await api.delete(`projects/${id}`);      
        const newProjects = projects.filter( 
         project => project.id !== id 
        )    
        setProjects(newProjects); // cria um novo array com a lista de projects sem o project removido
	  }

		return(
			<>
			<Header title='Projects'/>        
			<ul>
			    {projects.map(project => <li key={project.id}>{project.title}<button onClick={() => handleRemoveProject(project.id)}>Remover</button></li>)} 
			</ul>       
			<button type="button" onClick={handleAddProject}>Adicionar projeto</button>
			</>
		);
}

export default App;
```

# Exibição na tela

- Quando aperta o botão, inclui um novo projeto
- Quando aperta o botão remover, deleta um projeto

<img src="https://ik.imagekit.io/dxwebster/Untitled_m1Upqgswo.png"/>

# Conexão com back-end

- Essa aplicação funciona armazenando os dados na ferramenta de testes Insonmia
- Cada vez que aperta o botão adicionar ou remover projeto, modifica a lista do  back-end

<img src="https://ik.imagekit.io/dxwebster/Untitled__1__Unamo-Qpo.png"/>
