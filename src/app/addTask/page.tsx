"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { taskSchema, type TaskType } from "../schemas/taskSchema";
import { useToast } from "../toastComponent/ToastContext";
import StartAnimation from "../animation/StartAnimation";

function AddTask() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const { addToast } = useToast();
    const { register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError }
        = useForm<TaskType>({
            resolver: zodResolver(taskSchema),
        });


    const onSubmit: SubmitHandler<TaskType> = async (data) => {

        try {
            const res = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            console.log(res);
            if (!res.ok) {
                setError("root", { message: "Something went wrong" });
            }
            addToast("Task added successfully!", "success")

        } catch (error) {
            console.log(error);
            addToast("Something went wrong", "error")
            setError("root", { message: "Something went wrong" });
        }
    }
    return (

        <StartAnimation>
            <div className="text-center text-lg md:text-2xl font-bold pt-10 w-xs items-center mx-auto mb-6 ">
                <h1>
                    Add New Task
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-5 justify-center items-center text-base sm:text-lg font-medium">

                    <input type="text" {...register("title")} placeholder="Task Title" className="w-full  p-2 rounded-2xl shadow-amber-500 shadow-md  focus:outline-none focus:ring-0 focus:border-amber-500 focus:border-1 " />
                    {errors.title && <p className="w-full  text-red-500 text-sm">{errors.title.message}</p>}

                    <textarea {...register("note")} placeholder="Task Description" className="w-full  leading-tight min-h-20 h-30 p-2 rounded-2xl shadow-amber-500 shadow-md  focus:outline-none focus:ring-0 focus:border-amber-500 focus:border-1" ></textarea>
                    {errors.note && <p className="w-full text-red-500 text-sm">{errors.note.message}</p>}

                    <div className="w-full flex justify-between ">
                        <div className="flex-1" >
                            <p className=" w-full font-medium mb-2 text-left">Status:</p>
                            {["To Do", "In Progress", "Done"].map((status) => (
                                <label key={status} className="w-full flex items-center space-x-2 text-left">
                                    <input
                                        type="radio"
                                        value={status}
                                        {...register("status")}
                                        className=" h-4 w-4 accent-amber-600 focus:ring-0"
                                    />
                                    <span className="w-full ">{status}</span>
                                </label>
                            ))}
                            {errors.status && (
                                <p className="w-full text-red-500 text-sm text-left mt-1">
                                    {errors.status.message}
                                </p>
                            )}
                        </div>
                        <div className="flex-1" >
                            <p className=" w-full font-medium mb-2 text-left">Priority:</p>
                            {["Low", "Medium", "High"].map((level) => (
                                <label key={level} className="w-full flex items-center space-x-2 text-left">
                                    <input
                                        type="radio"
                                        value={level}
                                        {...register("priority")}
                                        className=" h-4 w-4 accent-amber-600 focus:ring-0"
                                    />
                                    <span className="w-full ">{level}</span>
                                </label>
                            ))}
                            {errors.priority && (
                                <p className="w-full text-red-500 text-sm text-left mt-1">
                                    {errors.priority.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="self-start mt-3 cursor-pointer w-full hover:bg-amber-500 shadow-amber-500 shadow-md rounded-2xl py-2 transition-all duration-500" >
                        {isSubmitting ? "Submitting ..." : "Submit"}</button>
                    {errors.root && <p className="w-full text-red-500 text-sm  mt-1">{errors.root.message}</p>}
                </form>
            </div>

        </StartAnimation>
    );
}

export default AddTask;