import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";


const initialState = {
    tasks : [{
        title: "Start Adding Tasks",
        description : "Add Your First Task Using The + On The Top.",
        due: "No Due",
        completed: false,
        id : nanoid(5)
    }]
}

export const taskSlice = createSlice({
    name:"task",
    initialState,
    reducers: {
        addTask : (state,action) =>{
            const task = {
                title: action.payload.title,
                description : action.payload.description,
                due:  action.payload.due,
                completed: false,
                id: nanoid(5)
            }
            state.tasks.push(task)
        },
        removeTask : (state,action) => {
             state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
        },
        editTask : (state,action) =>{
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
  
            if (index !== -1) {
                
                state.tasks[index] = {
                ...state.tasks[index],
                title: action.payload.title,
                description: action.payload.description,
                due: action.payload.due,
                };
            }
        },
        markTaskComplete : (state,action) =>{
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
  
            if (index !== -1) {
                
                state.tasks[index] = {
                ...state.tasks[index],
                completed: true,
               
                };
            }
        }
       
    }
})

export const {addTask,removeTask,editTask,markTaskComplete} = taskSlice.actions;

export default taskSlice.reducer;