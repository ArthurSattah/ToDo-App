"use client"
import { useEffect, useRef, useState } from "react";
import { TaskType } from "../schemas/taskSchema";
import LinkButton from "./LinkButton";
import { useSearchParams } from "next/navigation";
import { useToast } from "../toastComponent/ToastContext";
import { motion, Variants } from "framer-motion";
import ListHeader from "../tasksListComponents/ListHeader";
import TasksDetails from "../tasksListComponents/TasksDetails";
import NoTask from "../tasksListComponents/NoTask";
import { useTheme } from "next-themes";
const priorityOrder = {
    "High": 1,
    "Medium": 2,
    "Low": 3
}

const containerVariants: Variants = {
    hidden: {
        y:"-100px",
        opacity: 0
    },
    visible: {
        y:"0",
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 1
        }
    },
}


function FilterdTasks({ tasks }: { tasks: TaskType[] | undefined }) {
    const {theme} = useTheme(); 

    const [clickTime, setClickTime] = useState(1);
    const searchParams = useSearchParams();
    const { addToast } = useToast();
    const [filterdTasks, setFilterdTasks] = useState<TaskType[] | undefined>(tasks);
    const [filter, setFilter] = useState<"Done" | "In Progress" | "To Do" | "All">("All");

    // Sort tasks by title or priority
    const orderByTitle = () => {
        if (filterdTasks) {
            const newFilteredTasks = [...filterdTasks];
            newFilteredTasks.sort((a, b) => a.title.localeCompare(b.title));
            setFilterdTasks(newFilteredTasks);
        }
        setClickTime(clickTime + 1);
    }
    const orderByPriority = () => {
        if (filterdTasks) {
            const newFilteredTasks = [...filterdTasks];
            newFilteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            setFilterdTasks(newFilteredTasks);
        }
        setClickTime(clickTime + 1);
    }

    // Filter tasks by status
    const UpdateFilter = (status: "Done" | "In Progress" | "To Do") => {
        if (filter === status)
            setFilter("All");
        else
            setFilter(status);
        setClickTime(clickTime + 1);
    }
    useEffect(() => {
        if (filter === "All")
            setFilterdTasks(tasks);
        else
            setFilterdTasks(tasks?.filter((task) => filter === task.status));
    }, [filter, tasks])

    // Add Toast
    const toastRef = useRef(false);

    useEffect(() => {
        const msg = searchParams.get("toast");
        if (msg && !toastRef.current) {
            addToast(msg, "success");
            toastRef.current = true;

            // Remove the toast query param from the URL
            const url = new URL(window.location.href);
            url.searchParams.delete("toast");
            window.history.replaceState({}, "", url.toString());
        }
    }, [searchParams]);

    return (
        <motion.div variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center text-lg md:text-2xl font-bold pt-10  "
            style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                transition: "background-color 0.8s", 
            }}>
            <h1 className="">Here are your Tasks:<br />Filter By</h1>

            {/* filter Buttons */}
            <div className="flex justify-between m-5 items-center ">
                <div className="flex-none sm:flex-1"></div>
                <div className="flex-3 sm:flex-2 flex  justify-between gap-3">
                    <button onClick={() => UpdateFilter("Done")} className={` ${(filter === "All" || filter === "Done") ? "bg-amber-500 " : "bg-amber-400 "} w-fit font-bold rounded-md  p-1 sm:p-2  shadow-amber-500 shadow-md cursor-pointer hover:scale-110 `}> Done</button>
                    <button onClick={() => UpdateFilter("In Progress")} className={`${(filter === "All" || filter === "In Progress") ? "bg-amber-500 " : "bg-amber-400 "} w-fit font-bold rounded-md p-1 sm:p-2  shadow-amber-500 shadow-md cursor-pointer hover:scale-110 `} > In Progress</button>
                    <button onClick={() => UpdateFilter("To Do")} className={`${(filter === "All" || filter === "To Do") ? "bg-amber-500 " : "bg-amber-400"} w-fit font-bold rounded-md p-1 sm:p-2  shadow-amber-500 shadow-md cursor-pointer hover:scale-110 `}> To Do</button>
                </div>
                <div className="flex-1 flex justify-end ">
                    <LinkButton href={"/addTask/"} variants="" title="Add Task" />
                </div>
            </div>

            <div className="mt-5 text-lg sm:text-xl flex flex-col gap-3 ">

                {/* Show header with sorting controls only when there are tasks */}
                {filterdTasks && filterdTasks.length > 0 && (
                    <ListHeader orderByTitle={orderByTitle} orderByPriority={orderByPriority} />
                )}


                {/* Render task list or fallback no-task component */}
                {filterdTasks && filterdTasks.length > 0 ?
                    <TasksDetails key={`${filter}-${clickTime}`} tasks={filterdTasks} />
                    :
                    <NoTask />
                }
            </div>
        </motion.div >

    );
}
export default FilterdTasks;