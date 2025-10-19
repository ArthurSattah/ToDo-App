"use client"
import Link from "next/link";
import { TaskType } from "../schemas/taskSchema"
import { motion, Variants } from "framer-motion"

const TasksVariants: Variants = {

    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1, y: 0,
        transition: {
            duration: 0.5
        }
    },
}
function TasksDetails({ tasks }: { tasks: TaskType[] }) {
    return (
        <>{
            tasks.map((task) => (
                <motion.div
                    variants={TasksVariants}
                    initial="hidden"
                    animate="visible"
                    key={task.id}>
                    <Link
                        href={`/tasks/${task.id}`}
                        className="flex justify-between border p-4 rounded-md shadow-amber-500 shadow-md mt-3 mx-5 sm:mx-10 text-left text-sm sm:text-lg">
                        <div
                            className={`flex-1 sm:flex-2 
                                ${task.status === "Done" ? "line-through" : ""} 
                                ${task.priority === "High" ? "text-red-600" : ""} 
                                ${task.priority === "Low" ? "text-green-600" : ""}`}>
                            {task.title}
                        </div>
                        <div
                            className={`flex-1 text-right ${task.status === "Done" ? "line-through" : ""} 
                            ${task.priority === "High" ? "text-red-600" : ""} 
                            ${task.priority === "Low" ? "text-green-600" : ""}`}>
                            {task.priority}
                        </div>
                        <div
                            className={`flex-1 text-right ${task.status === "Done" ? "line-through" : ""}
                                 ${task.priority === "High" ? "text-red-600" : ""} 
                                 ${task.priority === "Low" ? "text-green-600" : ""}`}>
                            {task.status}
                        </div>
                    </Link>
                </motion.div>
            ))
        }
        </>
    );
}

export default TasksDetails;