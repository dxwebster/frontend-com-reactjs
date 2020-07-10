import React, { useState, useEffect } from 'react'; // importa o react
import api from './services/api'; // importa a api que contém o axios para conectar com o bak-end

import './App.css';
import Header from './components/Header';

// Componente Aplicação
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
            {projects.map(project => <li key={project.id}>{project.title}<button onClick={() => handleRemoveProject(project.id)}>Remover</button></li>)} 
        </ul>
       
        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;
