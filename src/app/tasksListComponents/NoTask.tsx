"use client"
import {motion, Variants} from "framer-motion"

const TasksVariants: Variants = {
    
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1, y: 0,
        transition: {
            duration: 0.5
        }
    },
}

function NoTask() {
    return (
    <motion.div
        variants={TasksVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center items-center">

        <div className="w-fit border p-4 rounded-md shadow-amber-500 shadow-md my-10 text-left">
            There is no Task left
        </div>
        
    </motion.div>);
}

export default NoTask;