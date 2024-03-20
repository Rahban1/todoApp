import React, { useState } from 'react'



function Todos({todos, onTodoComplete}) {

  const handleCompleteClick = async (todoId) => {
    try {
      const updatedTodo = { ...todos.find(todo => todo._id === todoId), completed: !todos.find(todo => todo._id === todoId).completed };
  
      // Send PUT request to update on the server
      const response = await fetch(`http://localhost:3000/completed`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: todoId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
  
      const data = await response.json();
  
      if (data.msg === "todo is updated") {
        // Update local state (optional)
        onTodoComplete(updatedTodo); // Notify parent component if necessary
      } else {
        console.error('Server error updating todo:', data.msg);
      }
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
        {todos.map((x)=>{
            return(
                <div key={x._id} className='bg-white shadow-sm hover:shadow-md flex justify-between items-center my-2 font-mono border rounded hover:border-sky-200'>
                    <div>
                      <h1 className='font-semibold ml-1'>{x.title}</h1>
                      <h2 className='font-normal ml-1'>{x.description}</h2>
                    </div>
                    <button onClick={()=>{handleCompleteClick(x._id)}} onTouchEnd={()=>{handleCompleteClick(x._id)}} className={x.completed === true ? 'border-2 bg-green-500 rounded-full p-1 mr-1' : 'border-2 border-green-300 hover:border-green-500 rounded-full p-1'} >{x.completed === true ? 'completed' : 'Mark as complete'}</button>
                </div>
            )
        })}
    </div>
  )
}

export default Todos