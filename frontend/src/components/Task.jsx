import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { markTaskComplete, removeTask } from '../redux/taskSlice';

function Task({input,editState,setEditState , setEditId}) {
    const [deleteState , setDeleteState] = useState(false)
   
    const dispatch = useDispatch()
    function handleDelete() {
        dispatch(removeTask({id : input.id}))
        setDeleteState(false);
    }

    function handleEdit (){
        setEditState(true);
        setEditId(input.id)
    }

    function handleComplete(){
        dispatch(markTaskComplete({id:input.id}))
    }

   

  return (
    <div>
     
        <div className='w-[350px] border rounded-md px-4 py-4 flex flex-col gap-3 '>
        <div className='flex justify-between'>
        <div className='title text-2xl font-semibold '>
            {input.title}
        </div>

        {input.completed ? (    <div className='text-2xl'>
        ✅
        </div>) : (<div className='text-2xl cursor-pointer' onClick={handleComplete}>
        🕐
        </div>)}
        </div>

        <div className='description text-lg'>
            {input.description}
        </div>
        <div className='due-date text-sm'>
            {input.due}
        </div>
        {
            deleteState ? (<div>
            <div>
                Are you sure ?
            </div>
            <div className='button-section flex gap-2 mt-2'>

        <div className='border rounded-md px-8 py-1 bg-red-400 cursor-pointer text-white' onClick={handleDelete}>
            Yes
        </div>
        <div className='border rounded-md px-8 py-1 bg-slate-200 cursor-pointer' onClick={()=>setDeleteState(false)}>
            No
        </div>
        </div>
        </div>):(<div className='button-section flex gap-2'>

        <div className='border rounded-md px-8 py-1 bg-slate-200 cursor-pointer' onClick={handleEdit}>
            Edit
        </div>
        <div className='border rounded-md px-8 py-1 bg-red-400 text-white cursor-pointer' onClick={()=>setDeleteState(true)}>
            Delete
        </div>

        </div>)
        }
        
        
        </div>
    </div>
    
  )
}

export default Task