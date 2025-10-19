"use client"
import { motion, Variants } from "framer-motion"
import { useTheme } from "next-themes";

const HeaderVariants: Variants = {
    hidden: {
        y: -60,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.5,
        }
    }
}
function HeaderAnimation({ children }: { children: React.ReactNode }) {
    const {theme} = useTheme()
    return (
        <motion.div
            variants={HeaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
                backgroundColor: theme === "dark" ? "black" : "white", 
                transition: "background-color 0.8s", 
            }}
            className="shadow-amber-500 shadow-md z-10 relative">
            {children}
        </motion.div>
    );
}

export default HeaderAnimation;