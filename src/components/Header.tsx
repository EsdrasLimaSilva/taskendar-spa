import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

interface Props {
    linkPath: string;
    linkText: string;
}

export default function Header({ linkPath, linkText }: Props) {
    return (
        <header className="flex justify-between bg-white p-4 shadow-sm">
            <img src={logo} alt="" className="block w-[32px]" />

            <Link
                to={linkPath}
                className="flex items-center justify-center rounded-md bg-neutral-400 px-8 text-base font-bold text-neutral-50"
            >
                {linkText}
            </Link>
        </header>
    );
}
