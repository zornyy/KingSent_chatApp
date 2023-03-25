import { Link } from "react-router-dom"
import pocketbaseEsDMts from "pocketbase"
import RoomDisplay from "../components/RoomDisplay";
import { useEffect, useState } from "react";
import '../styles/MyRooms.css'

export default function MyRooms() {
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;

    const [userRooms, setUserRooms] = useState([])


    // Rooms can't be fetched 
    async function getUserRooms() {
        const resultList = await pb.collection("chat_room").getList(1, 50,
            {
                expand: 'user_id',
                filter: `user_id="${currentUser.id}"`,
                sort: '-created'
            })
        setUserRooms(resultList.items) 
    }

    useEffect(() => {
        getUserRooms()
    }, [])


    return (
        <div className="ProfilePage">
            <Link to="/"> 
                <div className="pageTitle">
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.41625 14.0411L20.0376 4.7488C21.2873 3.65218 23.25 4.54343 23.25 6.20774L23.25 24.7922C23.2503 25.1647 23.1433 25.5294 22.9417 25.8426C22.7401 26.1558 22.4525 26.4042 22.1133 26.5582C21.7741 26.7121 21.3978 26.765 21.0293 26.7106C20.6608 26.6561 20.3158 26.4966 20.0357 26.2512L9.41819 16.9589C9.21008 16.7771 9.04329 16.5528 8.92901 16.3012C8.81473 16.0495 8.7556 15.7764 8.7556 15.5C8.7556 15.2236 8.81473 14.9505 8.92901 14.6988C9.04329 14.4472 9.21008 14.2229 9.41819 14.0411H9.41625Z" fill="#D9D9D9"/>
                    </svg>
                    <h2>My Rooms</h2> 
                </div>
            </Link>
            
            <div className="MyRoomsContainer">
                {userRooms.map((item, index) => <RoomDisplay key={index} Iname={item.name} Idescription={item.description} Iid={item.id} />)}

            </div>
        </div>
            
        
    )
}