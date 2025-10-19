"use client"
import { motion, Variants } from "framer-motion"
import { useTheme } from "next-themes"

const HomeVariants: Variants = {
    hidden: {
        y: "-100px",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.5,
        }
    },
}
function StartAnimation({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()
    return (
        <motion.div
            variants={HomeVariants}
            initial="hidden"
            animate="visible"
            style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                transition: "background-color 0.8s", 
            }}
            className="z-1">
            {children}
        </motion.div>
    )
}

export default StartAnimation;