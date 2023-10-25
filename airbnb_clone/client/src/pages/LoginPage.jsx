import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser}=useContext(UserContext);
    async function handleLogin(event){
        event.preventDefault();
        try{
            const response = await axios.post('/login',{email,password});
            setUser(response.data);
            alert('Login successful');
            setRedirect(true);
        }catch (e){
            alert('Login failed');
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div className="mt-4 flex flex-col items-center">
            <h1 className="text-4xl mb-4">Login</h1>
            <form className="max-w-md" onSubmit={handleLogin}>

                <input type="email" className="w-full p-2 border" placeholder="your@email.com"
                    value={email} onChange={(event) => {
                    setEmail(event.target.value);
                }}/>

                <input type="password" className="w-full p-2 border" placeholder="Password"
                       value={password} onChange={(event) => {
                        setPassword(event.target.value);
                }}/>
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
