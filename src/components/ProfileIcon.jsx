import { useState } from "react";
import pocketbaseEsDMts from "pocketbase";
import { Link } from "react-router-dom";

export default function ProfileIcon() {
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;
     
    return (
        <Link to="/profile" id="profileLink"> 
            <div className="profileIcon">
            {currentUser.avatar
            ? <img src={`http://127.0.0.1:8090/api/files/${currentUser.collectionName}/${currentUser.id}/${currentUser.avatar}?thumb=100x100`} className="profilePicture" alt="Your avatar"></img>
            : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>}
                {currentUser.username}
            </div>
        </Link>
    )
}