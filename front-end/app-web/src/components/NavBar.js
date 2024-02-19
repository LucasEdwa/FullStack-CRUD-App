import { Link } from "react-router-dom";
export default function NavBar() {
    return (
        <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
            Alltravel</Link>
        <Link to="/add-country" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
        >Add Country</Link>
        </div>
    );
    }