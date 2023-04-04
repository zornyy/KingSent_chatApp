import pocketbaseEsDMts from "pocketbase";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import '../styles/Profile.css'
import { useLocation } from "react-router";

export default function EditRoom() {
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;
    const [chatRoomId, setChatRoomId] = useState((useLocation().search).replace('?', ''));
    const [isLoading, setIsloading] = useState(true);
    const [chatRoom, setChatRoom] = useState();
    const [isProfilePic, setIsProfilePic] = useState(false);

    const [newName, setNewName] = useState();
    const [newDescription, setNewDescription] = useState();
    const [newImage, setNewImage] = useState();
    const [rmvImage, setRmvImage] = useState(false);


    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    }

    const handleFileInputChange = (e) => {
        setNewImage(document.getElementById("profilePicFileInput").files[0])
    }

    const removeImage = (e) => {
        setRmvImage(true);
        console.log("Set to true")
    }



    async function updateRoom() {

        const data = new FormData()
            data.append("name", newName)
            data.append("description", newDescription)
            if (newImage) {
                data.append("avatar", newImage)
            } else if (rmvImage) {
                data.append("avatar-", chatRoom.image)
            }
            

        const record = await pb.collection('chat_room').update(chatRoomId, data);
    }

    async function fetchRoom() {
        const result = await pb.collection("chat_room").getOne(chatRoomId, {
            expand: 'user_id',
        });
        setChatRoom(result);
        setNewName(result.name);
        setNewDescription(result.description);
        setIsloading(false);
        if (result.image) {
            setIsProfilePic(true);
        }
    }

    useState(() => {
        fetchRoom();
    }, [])

    if (isLoading) {
        return (
            <div className="centerCont">
                <h2 className="loading">Loading...</h2>
            </div>
        )
    }

    return (
        <div className="ProfilePage">
        <Link to={"/display-room/?"+chatRoomId}> 
            <div className="pageTitle">
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41625 14.0411L20.0376 4.7488C21.2873 3.65218 23.25 4.54343 23.25 6.20774L23.25 24.7922C23.2503 25.1647 23.1433 25.5294 22.9417 25.8426C22.7401 26.1558 22.4525 26.4042 22.1133 26.5582C21.7741 26.7121 21.3978 26.765 21.0293 26.7106C20.6608 26.6561 20.3158 26.4966 20.0357 26.2512L9.41819 16.9589C9.21008 16.7771 9.04329 16.5528 8.92901 16.3012C8.81473 16.0495 8.7556 15.7764 8.7556 15.5C8.7556 15.2236 8.81473 14.9505 8.92901 14.6988C9.04329 14.4472 9.21008 14.2229 9.41819 14.0411H9.41625Z" fill="#D9D9D9"/>
                </svg>
                <h2>Edit - {chatRoom.name}</h2> 
            </div>
        </Link>
        <div className="RoomPage">
                {isProfilePic
                ? <img className="RoomImg" src={`http://127.0.0.1:8090/api/files/chat_room/${chatRoom.id}/${chatRoom.image}?thumb=100x100`}/>
                : <img className="RoomImg" src="https://icon-library.com/images/online-chat-icon/online-chat-icon-7.jpg"/>}
                <h2 className="RoomName">{chatRoom.name}</h2>


                <div className="info">
                    <div className="label">Name</div>
                    <input type="text" placeholder={chatRoom.name} className="PrEditInput" onChange={handleNameChange} />
                </div>

                <div className="info">
                    <div className="label">Description</div>
                    <textarea type="text" placeholder={chatRoom.description} className="PrEditInput area" onChange={handleDescriptionChange} />
                </div>

                <div className="info">
                    <div className="label">Image</div>
                    <input type="file" accept="image/*" id="profilePicFileInput" className="PrEditInput" onChange={handleFileInputChange} />
                    <div className="rmvProfileBtn" onClick={removeImage}>Remove Image</div>
                </div>
                
                
                <Link className="LinkButton" onClick={updateRoom} to={"/edit-room/?"+chatRoomId}>
                    Update {chatRoom.name}
                </Link>
            </div>
        </div>
    )
}