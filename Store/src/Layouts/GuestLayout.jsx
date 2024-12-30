import { Link } from "react-router-dom";
import Login from '../Pages/Login';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[#cbe896]">
            <div>
            {children}
            </div>
        </div>
    );
}
