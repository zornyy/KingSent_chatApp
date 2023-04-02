import pocketbaseEsDMts from "pocketbase";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import '../styles/Profile.css'

export default function EditProfile() {
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;
    const [newUsername, setNewUsername] = useState(currentUser.username);
    const [newStatus, setNewStatus] = useState(currentUser.status);
    const [newBiography, setNewBiography] = useState(currentUser.biography);
    const [newFullName, setNewFullName] = useState(currentUser.name);
    const [newProfilePic, setNewProfilePic] = useState(null);

    const [isPorfilePic, setIsProfilePic] = useState(false);
    const [rmvProfilePic, setRmvProfilePic] = useState(false);

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    }

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value)
    }

    const handleBiographyChange = (e) => {
        setNewBiography(e.target.value)
    }

    const handleFullNameChange = (e) => {
        setNewFullName(e.target.value)
    }

    const handleFileInputChange = (e) => {
        setNewProfilePic(document.getElementById("profilePicFileInput").files[0])
    }

    const removeProfilePic = (e) => {
        setRmvProfilePic(true);
        console.log("Set to true")
    }


    async function updateProfile() {

        const data = new FormData()
            data.append("username", newUsername)
            data.append("emailVisibility", false)
            data.append("name", newFullName)
            data.append("biography", newBiography)
            data.append("status", newStatus)
            if (newProfilePic) {
                data.append("avatar", newProfilePic)
            } else if (rmvProfilePic) {
                data.append("avatar-", currentUser.avatar)
            }
            

        const record = await pb.collection('users').update(currentUser.id, data)
        

    }

    useState(() => {
        if (currentUser.avatar) {
            setIsProfilePic(true)
        }
    }, [])

    return (
        <div className="ProfilePage">
        <Link to="/profile"> 
            <div className="pageTitle">
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41625 14.0411L20.0376 4.7488C21.2873 3.65218 23.25 4.54343 23.25 6.20774L23.25 24.7922C23.2503 25.1647 23.1433 25.5294 22.9417 25.8426C22.7401 26.1558 22.4525 26.4042 22.1133 26.5582C21.7741 26.7121 21.3978 26.765 21.0293 26.7106C20.6608 26.6561 20.3158 26.4966 20.0357 26.2512L9.41819 16.9589C9.21008 16.7771 9.04329 16.5528 8.92901 16.3012C8.81473 16.0495 8.7556 15.7764 8.7556 15.5C8.7556 15.2236 8.81473 14.9505 8.92901 14.6988C9.04329 14.4472 9.21008 14.2229 9.41819 14.0411H9.41625Z" fill="#D9D9D9"/>
                </svg>
                <h2>Edit - {currentUser.username}</h2> 
            </div>
        </Link>
        <div className="profileDisplay">
            {isPorfilePic
            ? <img src={`http://127.0.0.1:8090/api/files/users/${currentUser.id}/${currentUser.avatar}?thumb=100x100`} className="profilePicture" alt="Your avatar"></img>
            : <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" className="profilePicture" alt="Your avatar"></img>}
            
            <h2 className="username">{currentUser.username}</h2>

            <h3 className="smallTitle">General Infos</h3>
            <div className="info">
                <div className="label">Username</div>
                <input type="text" placeholder={currentUser.username} className="PrEditInput" onChange={handleUsernameChange} />
            </div>
            <div className="info">
                <div className="label">Status</div>
                <textarea type="text" placeholder={currentUser.status} className="PrEditInput area" onChange={handleStatusChange} />
            </div>
            <div className="info">
                <div className="label">Biography</div>
                <textarea type="text" placeholder={currentUser.biography} className="PrEditInput area" onChange={handleBiographyChange} />
            </div>
            <div className="info">
                <div className="label">Profile Picture</div>
                <input type="file" accept="image/*" id="profilePicFileInput" className="PrEditInput" onChange={handleFileInputChange} />
                <div className="rmvProfileBtn" onClick={removeProfilePic}>Remove profile Picture</div>
            </div>
            <div className="info">
                <div className="label">Full Name</div>
                <input type="text" placeholder={currentUser.name} className="PrEditInput" onChange={handleFullNameChange} />
            </div>

            <div className="bottomButtons">
               <Link to="/profile" onClick={updateProfile} className="logoutButton" >Update Profile</Link>
            </div>
            
        </div>
        </div>
    )
}