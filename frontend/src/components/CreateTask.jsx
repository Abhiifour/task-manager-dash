import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../redux/taskSlice';

function CreateTask({setAddTaskState,editState,setEditState,editId}) {
    const tasks = useSelector(state => state.tasks)
    const filteredTask = tasks.filter((task)=>task.id === editId )
    const dispatch = useDispatch()
    const [title , setTitle] = useState(editState ? filteredTask[0]?.title : "");
    const [description , setDescription] = useState(editState ? filteredTask[0]?.description : "");
    const [dueDate , setDueDate] = useState(editState ? filteredTask[0]?.due : "");
  
    
    function handler () {
      setAddTaskState(false)
      setEditState(false)

   }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(editState){
          dispatch(editTask({
            title,
            description,
            due:dueDate,
            id : editId

        }))
        }
        else{
          dispatch(addTask({
            title,
            description,
            due:dueDate
        }))
        }
        
        handler()
    }

   


  return (
    <div className='w-[600px] mx-auto p-6 border rounded-md mt-14'>
    <div className='flex justify-end'>
    <div className='text-xl cursor-pointer' onClick={handler}>❌</div>
    </div>
      
        <form onSubmit={handleSubmit} className="task-form ">
      <div className='flex flex-col gap-3'>       
        <label htmlFor="title" className='text-2xl'>Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className='text-xl border rounded-md px-1 py-2'
        />
      </div>
      <div className='flex flex-col gap-3 mt-4'>
        <label htmlFor="description" className='text-2xl'>Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className='text-xl border rounded-md px-1 py-2'
        />
      </div>
      <div className='flex gap-4 mt-4'>
        <label htmlFor="dueDate" className='text-2xl'>Due Date:</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} 
          className='cursor-pointer'
        />
      </div>
    <button type="submit" className='border rounded-md px-8 py-1 bg-red-400 text-white cursor-pointer mt-6' onClick={handleSubmit}>{ editState ? "Save Changes":"Add Task"}</button>
    </form>
    </div>
  )
}

export default CreateTask;