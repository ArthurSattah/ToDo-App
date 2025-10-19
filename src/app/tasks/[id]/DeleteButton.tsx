"use client";

import { useToast } from "@/app/toastComponent/ToastContext";
import { useRouter } from "next/navigation";

type Props = {
  id: string | undefined;
};

function DeleteButton({ id }: Props) {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { addToast } = useToast();

  const deleteTask = async () => {

    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      addToast("Something went wrong, Please refresh the page", "error");
    } else {
      router.push("/tasks?toast=Deleted successfully!");
    }
  };

  return (
    <div>
      <button
        onClick={() => deleteTask()}
        className="
          cursor-pointer 
          bg-red-500 
          hover:bg-red-600 
          active:bg-red-700 
          font-semibold 
          px-4 
          py-2 
          rounded-md 
          shadow-md 
          hover:shadow-lg
          hover:-translate-y-1 
          active:scale-95
        "
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteButton;
