import { useEffect, useState } from "react";
import pocketbaseEsDMts from "pocketbase"

export default function Message({Icontent , Iuser}, ) {
    const [user, setUser] = useState(Iuser);
    const [content, setContent] = useState(Icontent);
    const [theme, setTheme] = useState(true);

    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;

    useEffect(() => {
        if (currentUser.username == Iuser) {
            setTheme(false);
        }
    }, []);

    

    return (
        <div className="message">
            {theme
            ? <label className="msgSentUser lblSelf">{user}</label>
            : <label className="msgSentUser lblOther">{user}</label>}
            
            {theme
            ? <div className="messageContent msgSelf">{content}</div>
            : <div className="messageContent msgOther">{content}</div>}
            
        </div>


    )
}