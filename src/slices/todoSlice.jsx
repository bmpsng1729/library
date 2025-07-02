import { createSlice } from "@reduxjs/toolkit"
const initialState = {


    //isLoggedin:JSON.parse(localStorage.getItem("isLoggedin")),
    allTask: JSON.parse(localStorage.getItem("allTask")) || [],
    // timeTable:JSON.parse(localStorage.getItem("timeTable"))|| [[]]

};
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
  const todo = action.payload.trim();

  if (todo && !state.allTask.includes(todo)) {
   state.allTask.push(todo);
    localStorage.setItem("allTask", JSON.stringify(state.allTask));
  }
}
,
        deleteTodo: (state) => {
            state.isLoggedin = false;
            state.token = null;
            state.userData = null;
            localStorage.setItem("isLoggedin", JSON.stringify(false));
        },
        deleteAllTodo: (state) => {
            state.allTask = [];
            localStorage.setItem("allTask", JSON.stringify(state.allTask));
        },
        // setTimeTable:(state,action)=>{
        //    // update the value in the redux store
        //    co
        //    state.timeTable.push(action.payload.day);
        //    localStorage.setItem("timeTable",JSON.stringify(state.timeTable));
        //    // save in the localstorage
        // }

    },
});

export const { addTodo, deleteTodo, deleteAllTodo,setTimeTable } = todoSlice.actions;
export default todoSlice.reducer;

// data in the userData