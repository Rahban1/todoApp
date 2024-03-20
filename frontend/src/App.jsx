import { useEffect, useState } from 'react'

import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'

function App() {
  const [todo , setTodo] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodo(data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
      // Handle error here, e.g., set a default value for todos or show an error message to the user
    }
  };
  const handleTodoComplete = async (updatedTodo) => {
    try {
      // Update local state here (optional)
      setTodo(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));

      // ... (fetch todos again to reflect changes, adjust based on your backend implementation)
      fetchData();
    } catch (error) {
      console.error('Error handling completed todo:', error.message);
      // Handle errors appropriately
    }
  };
  useEffect(() => {
    fetchData();
  }, [todo]);

  return (
    <div className='flex justify-center items-center flex-col gap-2 bg-gray-100 h-screen'>
      <CreateTodo/>
      <Todos todos={todo} onTodoCompleteTodoComplete={handleTodoComplete}/>
    </div>
  )
}

export default App
