// by mistake i have full admin code here,according to the component name ,i should not have to do it.
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import InputCard from '../InputCard';
import { useSelector } from 'react-redux';
import TodoCard from './TodoCard';
import { useDispatch } from 'react-redux';
import { MdDone } from "react-icons/md";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";  // for done
import { MdDeleteForever } from "react-icons/md";
import { deleteAllTodo } from '../../../slices/todoSlice';
import { IconLabelButtons } from '../../index';

function SidebarCard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const allTodo = useSelector((state) => state.todo.allTask) || [""];
    const name = JSON.parse(localStorage.getItem("userData")).name;
    // console.log(typeof (allTodo));
    // console.log(allTodo);
    const dispatch = useDispatch();

    //take index value
    // give index to the deleteTodo and write logic there

    // delete all
    const handleDeleteAllTodo = () => {
        dispatch(deleteAllTodo());
    }


    return (
        <div className="min-h-screen mt-10 bg-gray-100 flex flex-col md:flex-row">
            {/* Mobile Toggle Button */}
            <div className="md:hidden p-4 flex justify-between items-center bg-white shadow">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block bg-white shadow md:min-w-[220px]`}>
                <Sidebar>
                    <Menu
                        menuItemStyles={{
                            button: {
                                [`&.active`]: {
                                    backgroundColor: '#13395e',
                                    color: '#b6c8d9',
                                },
                                padding: '10px 16px',
                                fontWeight: '500',
                            },
                        }}
                    >
                        <MenuItem component={<Link to="fee-payment" />}>make Payment</MenuItem>
                        <MenuItem component={<Link to="your-detail" />}>See your Details</MenuItem>
                        <MenuItem component={<Link to="update-profile" />}>Update Profile</MenuItem>
                        <MenuItem component={<Link to="time-table" />}>Make Routine</MenuItem>
                    </Menu>
                </Sidebar>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 w-full">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
                        {
                            `Welcome ${name}`
                        }
                    </h1>

                    <img
                        src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                        alt="Profile Avatar"
                        className="w-12 h-12 rounded-full"
                    />
                </div>
                <div className="text-gray-600">
                    <h1 className='font-bold text-3xl font-green'> Task List</h1>
                    <InputCard />
                </div>
                <div className="flex justify-center bg-gray-100">
                    <table className="w-full max-w-3xl border border-gray-300 rounded-xl shadow-md">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left w-[80%]">Task</th>
                                <th className="py-3 px-2 text-center w-[10%]">Done</th>
                                <th className="py-3 px-2 text-center w-[10%]">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {allTodo.map((todo, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
                                >
                                    <td className="py-3 px-4">{todo}</td>
                                    <td className="py-3 px-2 text-center text-blue-500 cursor-pointer hover:text-blue-700">
                                      <MdDone/>
                                    </td>
                                    <td className="py-3 px-2 text-center text-red-500 cursor-pointer hover:text-red-700">
                                        <MdDeleteForever />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className='flex items-center justify-center'>
                    <IconLabelButtons type="submit" onClick={handleDeleteAllTodo} children='Delete all ' />
                </div>




            </div>
        </div>
    );
}

export default SidebarCard;
