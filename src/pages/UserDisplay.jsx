import { Link, useLocation } from "react-router-dom"
import pocketbaseEsDMts from "pocketbase"
import { useEffect, useState } from "react"
import '../styles/UserDisplay.css'

export default function UserDisplay() {
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090");
    const currentUser = pb.authStore.model;
    const [userId, setUserId] = useState((useLocation().search).replace('?', ''));
    const [user, setUser] = useState();
    const [isLoaded, setIsLoaded] = useState(false);


    async function fetchUserInfo() {
        const result = await pb.collection("users").getOne(userId);
        setUser(result);
        setIsLoaded(true);
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    if (!isLoaded) {
        return(
            <div className="centerCont">
                <h2 className="loading">Loading...</h2>
            </div>
            
        )
    }
    return (
        <div className="UserDisplay">
            <Link to="/"> 
                <div className="pageTitle">
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.41625 14.0411L20.0376 4.7488C21.2873 3.65218 23.25 4.54343 23.25 6.20774L23.25 24.7922C23.2503 25.1647 23.1433 25.5294 22.9417 25.8426C22.7401 26.1558 22.4525 26.4042 22.1133 26.5582C21.7741 26.7121 21.3978 26.765 21.0293 26.7106C20.6608 26.6561 20.3158 26.4966 20.0357 26.2512L9.41819 16.9589C9.21008 16.7771 9.04329 16.5528 8.92901 16.3012C8.81473 16.0495 8.7556 15.7764 8.7556 15.5C8.7556 15.2236 8.81473 14.9505 8.92901 14.6988C9.04329 14.4472 9.21008 14.2229 9.41819 14.0411H9.41625Z" fill="#D9D9D9"/>
                    </svg>
                    <h2>{user.username}</h2> 
                </div>
            </Link>
            <div className="DisplayUserPage">
                <img className="UserPP" src={`http://127.0.0.1:8090/api/files/${currentUser.collectionName}/${userId}/${user.avatar}?thumb=100x100`}/>
                <h2 className="Username" style={{marginTop: "-0.5em"}}>{user.username}</h2>
                <Link className="prvMessBtn">Private Messages</Link>
                <div>
                <label className="lblField">status</label>
                    <div className="status">{user.status} And some shit to make it very long</div>
                </div>
                
                <div>
                    <label className="lblField">Biography</label>
                    <div className="UserBiography">
                        {user.biography}
                    </div>
                </div>
                <div className="memberSince"><div className="bold">KingSent member since</div> {user.created.split(" ")[0]}</div>
            </div>
        </div>
    )
}