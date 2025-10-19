"use client"
import { motion, Variants } from "framer-motion"
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

// Use percentages instead of fixed px values so the animation adapts to container width
const sunToggle: Variants = {
    hidden: {
        opacity: 0,
        x: "220%",
        rotate: 0,
    },
    visible: {
        opacity: 1,
        x: "0%",
        rotate: -180,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    hover: {
        scale: 1.1
    }
}

const moonToggle: Variants = {
    hidden: {
        opacity: 0,
        x: "0%",
        rotate: 180,
    },
    visible: {
        opacity: 1,
        x: "220%",
        rotate: 360,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    hover: {
        scale: 1.1
    }
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div
            onClick={() => setTheme(theme === 'light' ? "dark" : "light")}
            className={`
                sm:p-2 sm:pr-6 sm:w-25
                   p-1    pr-5    w-18 
                   
                flex items-center
                rounded-xl border border-gray-300 shadow-md cursor-pointer
                dark:bg-gray-800
                transition-all duration-300
                bg-white
            `}
        >
            {theme === "dark" ? (
                <motion.div
                    variants={moonToggle}
                    className="w-2/5"
                    key="dark"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                >
                    {/* use Tailwind sizing on the SVG so it scales responsively */}
                    <FaMoon className="w-full text-blue-500" />
                </motion.div>
            ) : (
                <motion.div
                    variants={sunToggle}
                    className="w-2/5"
                    key="light"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                >
                    <FaSun className="w-full text-yellow-400" />
                </motion.div>
            )}
        </div>
    );
}

export default ThemeToggle;
