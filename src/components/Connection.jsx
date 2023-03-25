import { useState } from "react";
import Login from "./Login";
import SignIn from "./SignIn";


export default function() {
    const [display, setDisplay] = useState(true)

    function handleClick() {
        if (display) {
            setDisplay(false)
        } else {
            setDisplay(true)
        }
    }

    return (
        <div className="connection">
            {display 
            ? <div className="logForm"><Login /> <div onClick={handleClick} className="pageLink">Create an account</div></div>
            : <div className="logForm"><SignIn /> <div onClick={handleClick} className="pageLink">Login to an account</div></div>
            }
        </div>
        )
}