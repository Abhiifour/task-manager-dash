import { useState } from 'react'
import Task from './components/Task'
import { useSelector,useDispatch } from 'react-redux'
import CreateTask from './components/CreateTask'
import EditTask from './components/EditTask'


function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [editState,setEditState] = useState(false)
  const [editId ,setEditId] = useState(0)
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks)
  const [editTask , setEditTask] = useState(false)
  const [addTaskState , setAddTaskState] = useState(false)
  const [tempTask , setTempTask] = useState(tasks)

  const [activeFilter, setActiveFilter] = useState("all");
  
  function completedTasks (){
    const filteredTask = tasks.filter((task) => task.completed === true)
    setActiveFilter("completed")
    setTempTask(filteredTask)
  }

  function pendingTasks (){
    const filteredTask = tasks.filter((task) => task.completed === false)
    setTempTask(filteredTask)
    setActiveFilter("pending")
  }

  function allTasks (){
    setActiveFilter("all")
    setTempTask(tasks)
  }

  function overdueTasks (){
    const today = new Date(); 
    const filteredTasks = tasks.filter((task) => {
    if (!task.due) return false; 
    const dueDate = new Date(task.due); 
    return dueDate < today && !task.completed; 
    });
    setTempTask(filteredTasks); 
    setActiveFilter("overdue")
  }

  function handleSearch(){
    setSearchQuery("");
    const filteredTask = tasks.filter((task) => task.title === searchQuery)
    setTempTask(filteredTask)
    setActiveFilter("search")
   
  }
 
  return (
   <div>
    <div className='header flex items-center justify-center text-3xl py-6 font-bold gap-2 '>
    Task Management 
    <div className='text-3xl cursor-pointer ' onClick={() => setAddTaskState(true)}> ➕</div>
    </div>
    <div className='flex justify-between w-[80%] mx-auto py-4'>
    <div className='filters flex gap-3 justify-start '>
        <div className={`px-4 py-2 rounded-md border cursor-pointer ${
          activeFilter === "all" ? "bg-slate-300" : "bg-slate-100"
        }`} onClick={allTasks}>
            All Tasks
        </div>
        <div className={`px-4 py-2 rounded-md border cursor-pointer ${
          activeFilter === "completed" ? "bg-slate-300" : "bg-slate-100"
        }`} onClick={completedTasks}>
            Completed Tasks
        </div>
        <div className={`px-4 py-2 rounded-md border cursor-pointer ${
          activeFilter === "pending" ? "bg-slate-300" : "bg-slate-100"
        }`} onClick={pendingTasks}>
            Pending Tasks
        </div>
        <div className={`px-4 py-2 rounded-md border cursor-pointer ${
          activeFilter === "overdue" ? "bg-slate-300" : "bg-slate-100"
        }`} onClick={overdueTasks}>
            Overdue Tasks
        </div>
      </div>
      <div className='flex gap-2'>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks by title..."
        className='px-3 py-2 border rounded-md'
      />
      <div className='text-2xl px-2 cursor-pointer border rounded-md' onClick={handleSearch}>
      🔎
      </div>
      </div>
    </div>
    {
      tasks ? (<div>
    {
      addTaskState || editState ? (<div><CreateTask setAddTaskState={setAddTaskState} editState={editState} setEditState={setEditState} editId={editId}/></div>) : ( <div className='task-section flex w-[75%] mx-auto gap-6 py-8 flex-wrap px-4 '>
    {
      activeFilter === 'all' ? (tasks.map((task) => <Task input={task} editState={editState} setEditState={setEditState} setEditId={setEditId}/>)) :
      (tempTask.map((task) => <Task input={task} editState={editState} setEditState={setEditState} setEditId={setEditId}/>))
      
    }
    
    </div>)
    }

    
      
    </div>) : "Start Adding Tasks!"
    }
    
   
   </div>
  )
}

export default App
