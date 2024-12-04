import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/taskSlice';

function CreateTask() {

    const dispatch = useDispatch()
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [dueDate , setDueDate] = useState();
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(addTask({
            title,
            description,
            due:dueDate
        }))
        
    }
  return (
    <div className='w-[600px] mx-auto p-6 border rounded-md'>
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
        />
      </div>
      <button type="submit" className='border rounded-md px-8 py-1 bg-red-400 text-white cursor-pointer mt-6'>{"Save Changes" }</button>
    </form>
    </div>
  )
}

export default CreateTask;