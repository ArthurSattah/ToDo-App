"use client"
import { useEffect } from "react";

function Error({ error }: { error: Error }) {
    useEffect(() => {
        console.log(error);
    }, [error])
    return (
    <div className="flex pt-10 items-center justify-center text-red-600 font-bold text-lg transition-all duration-800">
        <p>Something went wrong while loading the task,Please refresh the page </p>
    </div>
    );
}

export default Error;