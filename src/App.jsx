import { useState } from "react"

function ListaTarefas(props) {
  return (
    <ul>
      {
        props.tarefas.map((item) => {
          return (
            <li>{item.texto}</li>
          )
        })
      }
    </ul>
  )
}

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: "Estudar React", feito: true },
    { id: 2, texto: "Fazer a trilha", feito: false },
  ])

  function addTarefa() {
    const novaTarefa = {
      id: 3,
      texto: "Estudar para as 120 perguntas da prova",
      feito: false
    }

    setTarefas([...tarefas, novaTarefa])
  }

  return (
    <div className="app">
      <h1>Minhas Tarefa
      </h1>
      <p>Comece adicionando sua primeira tarefa</p>

      <button onClick={addTarefa}>Adicionar tarefa</button>

      <br />
      <br />
      <br />

      <ListaTarefas tarefas={tarefas} />
      
      <hr />
      
      <ListaTarefas tarefas={tarefas} />
      
      <hr />
      
      <ListaTarefas tarefas={tarefas} />
    </div>
  )
}

export default App
