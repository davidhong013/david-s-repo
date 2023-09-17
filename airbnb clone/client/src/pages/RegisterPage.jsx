import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
export default function RegisterPage() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    function registerUser(event){
        event.preventDefault();
        axios.post('/register', {
            name,
            email,
            password
        });
    }


    return (
        <div className="mt-4 flex flex-col items-center">
            <h1 className="text-4xl mb-4">Register</h1>
            <form className="max-w-md" onSubmit={registerUser}>
                <input type="text" placeholder="first and last name"
                       value={name}
                       onChange={(event) => {
                        setName(event.target.value);
                        }}/>
                <input type="email" className="w-full p-2 border" placeholder="your@email.com"
                    value = {email}
                    onChange={event => {
                        setEmail(event.target.value);
                    }}/>

                <input type="password" className="w-full p-2 border" placeholder="Password"
                    value = {password}
                    onChange={event => {
                        setPassword(event.target.value);
                    }}/>
                <button className="w-full p-2 bg-primary text-white rounded">Register</button>
                <div className="text-center py-2 text-gray-500">
                    Already a member?
                    <Link className="underline text-black" to={'/login'}>
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}