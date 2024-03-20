import React, {useState} from 'react'


function CreateTodo() {
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')

    const handleAddTodo = async ()=>{
        try {
            const response = await fetch("http://localhost:3000/todo",{
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-type" : "application/json"
                }
            });
            if(!response.ok) {
                console.log(response)
            }
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding todo: ',error.message);
            //alert('failed to add todo. Please try again later');
        }
    }

    return (
    <div className='shadow-md font-mono bg-white flex flex-col justify-center items-center rounded border-2 mt-1'>
        <input className='m-3 p-3 bg-blue-200 rounded' value={title} type="text" placeholder='title' onChange={(e)=>{
            const value = e.target.value;
            setTitle(value);
        }}/> <br />
        <input className=' p-2 bg-pink-200 rounded' value={description} type="text" placeholder='description' onChange={(e)=>{
            const value2 = e.target.value;
            setDescription(value2);
        }}/> <br />

        <button className='border-2 border-slate-400 rounded mb-3 p-2 hover:shadow-md hover:border-black hover:border-2' onClick={handleAddTodo} onTouchEnd={handleAddTodo}>Add a Todo</button>
    </div>
  )
}

export default CreateTodo