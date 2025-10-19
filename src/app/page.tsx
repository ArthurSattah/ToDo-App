import Link from "next/link";
import StartAnimation from "./animation/StartAnimation";

export default function Home() {
  return (
    <StartAnimation >
      <main className=" flex justify-center flex-col text-center pt-10 text-2xl sm:text-4xl items-center  ">
        <h1>Welcome to My Todo App !</h1>
        <p>Organize your day and stay productive!</p>

        <div className="flex flex-wrap justify-evenly  gap-15 mt-10 ">

          <section className="w-3xs sm:w-sm " >
            <h2 className="text-xl sm:text-2xl mb-2" >About this app</h2>
            <p className="text-lg sm:text-xl">
              This app helps you manage tasks, set priorities, and track your
              progress easily.
            </p>
          </section>

          <section className="w-3xs sm:w-sm " >
            <h2 className="text-xl sm:text-2xl mb-2">Quick Tips</h2>
            <ul className="text-lg sm:text-xl list-none "  >
              <li className="mt-2">✅ Add tasks using the “New Task” button.</li>
              <li className="mt-2">🗑️ Delete tasks once they’re done.</li>
              <li className="mt-2">🌙 Toggle between dark and light mode!</li>
            </ul>
          </section>
        </div>
        <Link
          href="/tasks"
          className="w-fit text-center px-5 py-2 bg-amber-600 font-semibold rounded-lg text-xl sm:text-2xl  m-10
                 shadow-md shadow-amber-500 hover:bg-amber-500 
                 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Go to Tasks
        </Link>
      </main>
    </StartAnimation>

  );
}
