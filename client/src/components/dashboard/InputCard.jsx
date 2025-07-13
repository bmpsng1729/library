import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import{addTodo,deleteAllTodo} from "../../slices/todoSlice";

function InputCard() {
    const [task, setTask] = useState('');
    const dispatch=useDispatch();
    // const [allTask, setAllTask] = useState([]);
    const handleFormSubmit = (e) => {

        e.preventDefault();
        if (task == "") return

        // handle here by the reducers funtions
        // setAllTask((prev) => [...prev, task]);
        dispatch(addTodo(task));
        setTask("");
    }
    const handleInput = (value) => {
        setTask(value);
    }
    // store the values in the localstorage
    // useEffect(()=>{
    //        localStorage.setItem("allTask",JSON.stringify(allTask));
    // },[allTask]);
    return (
        <div className="w-full flex justify-center mt-8 px-4">
            <form className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full max-w-xl" onSubmit={handleFormSubmit}>
                <input
                    value={task}
                    onChange={(e) => handleInput(e.target.value)}
                    className="text-black bg-amber-300 border-2 p-2 rounded-2xl w-full"
                    placeholder="Enter task..."
                />

                <button
                    className="
        mt-2 sm:mt-0
        bg-emerald-400 text-white px-4 py-2 rounded-xl relative overflow-hidden
        before:content-[''] before:absolute before:h-[2px] before:w-6 before:right-0 before:top-[-4px] before:border-t-2 before:border-[#263059] before:transition-all before:duration-300
        after:content-[''] after:absolute after:h-[2px] after:w-6 after:left-0 after:bottom-[-4px] after:border-b-2 after:border-[#263059] after:transition-all after:duration-300
        hover:before:w-full hover:after:w-full
       cursor-pointer hover:scale-105 transition duration-300  hover:bg-emerald-500"
                >
                    Add
                </button>
            </form>
        </div>





    )
}

export default InputCard
