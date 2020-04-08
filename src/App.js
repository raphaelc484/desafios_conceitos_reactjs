import React, {useState,useEffect}from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories').then(res=>{
      setRepositories(res.data)
    })

  },[])

  async function handleAddRepository() {
    const res = await api.post('repositories',{
      title:`Novo registro ${Date.now()}`,
      url:"https://github.com/raphaelc484/desafios_conceitos_node",
      techs:["Node.js","express","uuidv4"]
    })

    const repositorie = res.data

    setRepositories([...repositories,repositorie])
  }

 function handleRemoveRepository(id) {

    api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repositorie => repositorie.id!==id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => {
          return(
                <li key={repositorie.id}>
              {repositorie.title}

              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </li>
          )
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
