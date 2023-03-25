import pocketbaseEsDMts from 'pocketbase'
import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;
    const [wrongData, setWrongData] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    async function LoginWithPwd(event) {
        event.preventDefault();

        pb.authStore.clear();

        try {
            console.log("Login Tried")
            const authData = await pb.collection('users').authWithPassword(
                username, 
                password,
            );
            window.location.reload(false);
        } catch {
            console.log("Login Catched")
            setWrongData(true)
        }
        
        return false;
    }

        return (
            <div className="flexCenter">
                <h2>Login to you account</h2>
                <form className="authForm">
                <div className="formField">
                    <label>Username</label>
                    {wrongData
                    ? <input className="inputError" onChange={handleUsernameChange} placeholder="Ex. Wonderboy" type="text"></input>
                    : <input onChange={handleUsernameChange} placeholder="Ex. Wonderboy" type="text"></input>}
                    
                </div>
                <div className="formField">
                    <label>Password</label>
                    {wrongData
                    ? <input className="inputError" onChange={handlePasswordChange} placeholder="Ex. AStrongPassword" type="password"></input>
                    : <input onChange={handlePasswordChange} placeholder="Ex. AStrongPassword" type="password"></input>}
                </div>
                <button onClick={LoginWithPwd}>Login</button>
                </form>
            </div>
            )
        
    }
    