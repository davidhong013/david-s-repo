import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="mt-4 flex flex-col items-center">
            <h1 className="text-4xl mb-4">Login</h1>
            <form className="max-w-md">

                <input type="email" className="w-full p-2 border" placeholder="your@email.com" />

                <input type="password" className="w-full p-2 border" placeholder="Password" />
                <button className="w-full p-2 bg-primary text-white rounded">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account?
                    <Link className="underline text-black" to={'/register'}>
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
}
