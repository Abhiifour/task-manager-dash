import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    editTaskState : true
}

export const editSlice = createSlice ({
    name :"editState",
    initialState,
    reducers:{
        updateEditState : (state,action) =>{
            const currState = state.editTaskState;
            state.editTaskState = !currState;
        }
    }
})


export const {updateEditState} = editSlice.actions;

export default editSlice.reducer;