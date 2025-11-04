import Link from "next/link";

export default function Header() {
    const linkStyling = "p-1 m-2 text-xl hover:underline";
    return(
        <header className="text-center items-center h-20">
            <h2 className="text-4xl font-semibold p-4">Harvard Art Museum: Artist Search</h2>
            <nav className="p-2 m-4">
            </nav>
        </header>
    );
}