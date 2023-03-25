import { useState } from "react"
import pocketbaseEsDMts from "pocketbase"
import '../styles/Connection.css'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [wrongData, setWrongData] = useState(false)
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleNameChange = (event) => {
        setFullName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    async function registerPocket(event) {
        event.preventDefault();
        const data = {
            username,
            password,
            passwordConfirm: password,
            name: fullName,
            email: email,
            biography: '...',
            status: "Hey, i'm on KingSent",
        };

        if (username == '' || password == '' || fullName == '' || email == '') {
            setWrongData(true);
        } else {
            try {
                const createdUser = await pb.collection('users').create(data);
                pb.authStore.clear();
                const authData = await pb.collection('users').authWithPassword(
                    username, 
                    password,
                );
                window.location.reload(false);
            } catch {
                setWrongData(true);
                console.log(wrongData)
            }
            
        }
        
        return false;
    }
    
    return (
        <div className="flexCenter">
            <h2>Create a new account</h2>
            <form className="authForm">
            <div className="formField">
                <label>Full name </label>
                {wrongData
                ? <input className="inputError" onChange={handleNameChange} placeholder="Ex. Stephen Thompson" type="text"></input>
                : <input onChange={handleNameChange} placeholder="Ex. Stephen Thompson" type="text"></input>
                }
                
            </div>
            <div className="formField">
                <label>Email </label>
                {wrongData
                ? <input className="inputError" onChange={handleEmailChange} placeholder="Ex. wonderking@com.com" type="email"></input>
                : <input onChange={handleEmailChange} placeholder="Ex. wonderking@com.com" type="email"></input>
                }
                
            </div>
            <div className="formField">
                <label>Username </label>
                {wrongData
                ? <input className="inputError" onChange={handleUsernameChange} placeholder="Ex. Wonderboy" type="text"></input>
                : <input onChange={handleUsernameChange} placeholder="Ex. Wonderboy" type="text"></input>
                }
                
            </div>
            <div className="formField">
                <label>Password </label>
                {wrongData
                ? <input className="inputError" onChange={handlePasswordChange} placeholder="Ex. AStrongPassword" type="password"></input>
                : <input onChange={handlePasswordChange} placeholder="Ex. AStrongPassword" type="password"></input>
                }
                
            </div>
            <button onClick={registerPocket}>Create Account</button>
         </form>
        </div>
    )
}