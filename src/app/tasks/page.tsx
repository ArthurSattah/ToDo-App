import FilterdTasks from "../components/FilterdTask";
import { z } from "zod";
import { taskSchema } from "../schemas/taskSchema";


async function Tasks() {
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}`).then(res => res.json());
    const Ztask = z.array(taskSchema).safeParse(res);
    const tasks = Ztask?.data;

    if (!Ztask.success) {
        console.log(Ztask.error);
        return <div className=" flex pt-10 items-center justify-center text-red-600 font-bold text-lg"> Some thing went wrong,Please refresh the page</div>
    }

    return (
        <FilterdTasks tasks={tasks} />
    );
}

export default Tasks;