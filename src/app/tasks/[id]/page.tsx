import { taskSchema } from "@/app/schemas/taskSchema";
import DeleteButton from "./DeleteButton";
import StartAnimation from "@/app/animation/StartAnimation";

async function Task({ params }: { params: { id: string } }) {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const id = params.id;
  const res = await fetch(`${API_URL}/${id}`).then((res) => res.json());
  if (res === "Not found") {
    return (
      <div className="flex mt-10 items-center justify-center text-red-600 font-bold text-lg transition-all duration-800">
        <p>Error 404 Task Not Found</p>
      </div>
    );
  }
  const Ztask = taskSchema.safeParse(res);

  if (!Ztask.success) {
    console.error(Ztask.error);
    return (
      <div className="flex mt-10 items-center justify-center text-red-600 font-bold text-lg transition-all duration-800">
        <p>Something went wrong while loading the task, Please refresh the page</p>
      </div>
    );
  }

  const task = Ztask.data;

  return (
    <StartAnimation>

      <div className="mt-10 flex flex-col items-center justify-center px-4 transition-all duration-800">
        <h1 className="text-2xl sm:text-4xl  font-bold text-amber-600 dark:text-amber-400 mb-8">
          Your Task Details
        </h1>

        <div className="w-full max-w-lg bg-gray-100 dark:bg-gray-900 shadow-amber-500 shadow-lg rounded-2xl p-6 transition-all duration-800 hover:scale-[1.01] ">
          <h2 className="text-lg sm:text-2xl font-semibold  mb-3 " >
            {task.title}
          </h2>

          <div className="space-y-2 text-gray-700 dark:text-gray-300 ">
            <p>
              <span className="font-medium ">
                Note:
              </span>{" "}
              {task.note}
            </p>
            <p>
              <span className="font-medium ">
                Priority:
              </span>{" "}
              <span
                className={`px-2 py-0.5 rounded-md text-sm ${task.priority === "High"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  : task.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"}`}
              >
                {task.priority}
              </span>
            </p>
            <p>
              <span className="font-medium">
                Status:
              </span>{" "}
              {task.status}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created At: {task.createdAt ? new Date(task.createdAt).toLocaleString() : "Unknown"}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <DeleteButton id={task.id} />
          </div>
        </div>
      </div>
    </StartAnimation>
  );
}

export default Task;
