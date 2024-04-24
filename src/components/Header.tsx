import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

interface Props {
    linkPath: string;
    linkText: string;
}

export default function Header({ linkPath, linkText }: Props) {
    return (
        <header className="p-4 bg-white flex justify-between shadow-sm">
            <img src={logo} alt="" className="block w-[32px]" />

            <Link
                to={linkPath}
                className="bg-neutral-400 text-neutral-50 text-base font-bold flex justify-center items-center px-8 rounded-md"
            >
                {linkText}
            </Link>
        </header>
    );
}
