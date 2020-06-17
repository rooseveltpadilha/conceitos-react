import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(repositories => {
      setRepositories(repositories.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: 'Conceitos React',
      url: 'https://github.com/rooseveltpadilha/conceitos-react',
      techs: [
        'AngularJS',
        'ReactJS'
      ],
    };

    const response = await api.post('repositories', repository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204) {
      const filteredItems = repositories.filter(repository => repository.id !== id);
      setRepositories(filteredItems);
    }
    
  }

  return (
    <div>

      <ul data-testid="repository-list">
       
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}> Remover </button> 
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
