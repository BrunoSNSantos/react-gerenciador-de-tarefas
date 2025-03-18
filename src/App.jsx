import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [] //comando para sempre retornar os dados do meu localstorage
  );

  //Executa minha função sempre que um item da lista é alterado
  //Estou utilizando para salvar os dados da minha lista no localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /*useEffect(() => {
    const fetchTasks = async () => {
      //chamando a API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3",
        {
          method: "GET",
        }
      );
      //convertendo a resposta da API para JSON
      const data = await response.json();
      //armazenando os dados no meu state
      setTasks(data);
    };
    //fetchTasks();
  }, []);
  */

  //função para quando o botão da tarefa é clicado
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //verifica se o id da minha iteração é igual ao id da task sendo clicada
      if (task.id === taskId) {
        //retorna a task como concluida
        return { ...task, isCompleted: !task.isCompleted };
      }
      //retorna a task sem alteração caso a condição não seja verificada
      return task;
    });
    setTasks(newTasks);
  }

  //função para deletar a tarefa
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId); //newTasks será todas as tasks que possuem ID diferente da task que cliquei
    setTasks(newTasks); //atualizo meu state para usar newTasks
  }

  //função para adicionar uma tarefa
  function onAddTaskClick(title, description) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6 overflow-auto">
      <div className="w-[500px] space-y-4 ">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de tarefas
        </h1>
        <AddTask onAddTaskClick={onAddTaskClick} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
