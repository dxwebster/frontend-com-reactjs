# Aplicação para listar projetos

## Funcionalidades da aplicação

- Cadastro de novos projetos
- Listagem de projetos
- Exclusão de um projeto

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
