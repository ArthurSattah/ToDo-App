
import HeaderAnimation from "../animation/HeaderAnimation";
import LinkButton from "./LinkButton";
import ThemeToggle from "./ThemeToggle";

function Header() {
    return (
        <HeaderAnimation>
            <header className=" w-full p-2 text-lg  font-bold flex items-center sm:text-2xl sm:p-4 ">
                <nav className="flex justify-between items-center w-full">
                    <LinkButton href="/" title="home" />
                    <div className="flex gap-4 items-center">
                        <ThemeToggle />
                        <LinkButton href="/tasks" title="Tasks" />
                    </div>
                </nav>
            </header>
        </HeaderAnimation>

    );
}

export default Header;