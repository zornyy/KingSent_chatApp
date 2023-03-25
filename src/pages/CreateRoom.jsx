import { useState } from "react"
import { Link } from "react-router-dom"
import pocketbaseEsDMts from "pocketbase"

export default function CreateRoom() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;


    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    async function createRoom(event) {
        event.preventDefault();

        const data = {
            name,
            description,
            user_id: currentUser.id,
        };

        if (name == '' || description == '') {
            console.log("Typing Error")
        } else {
            try {
                const createdRoom = await pb.collection('chat_room').create(data);
                console.log("executed")
            } catch {
                console.log("Room could not be created")
            }
        }
    }

    return (
        <div className="createRoom_page">
            <Link to="/"> 
                <div className="pageTitle">
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.41625 14.0411L20.0376 4.7488C21.2873 3.65218 23.25 4.54343 23.25 6.20774L23.25 24.7922C23.2503 25.1647 23.1433 25.5294 22.9417 25.8426C22.7401 26.1558 22.4525 26.4042 22.1133 26.5582C21.7741 26.7121 21.3978 26.765 21.0293 26.7106C20.6608 26.6561 20.3158 26.4966 20.0357 26.2512L9.41819 16.9589C9.21008 16.7771 9.04329 16.5528 8.92901 16.3012C8.81473 16.0495 8.7556 15.7764 8.7556 15.5C8.7556 15.2236 8.81473 14.9505 8.92901 14.6988C9.04329 14.4472 9.21008 14.2229 9.41819 14.0411H9.41625Z" fill="#D9D9D9"/>
                    </svg>
                    <h2>Create a new Room</h2> 
                </div>
            </Link>
            <div className="createRoom_form">
                <div className="titleFormField">
                    <h3 className="smallTitle">Name of the Room</h3>
                    <input className="titleInput" onChange={handleNameChange} placeholder="Ex. Best chocolate bar" type="text" />
                </div>
                <div className="titleFormField">
                    <h3 className="smallTitle">Description</h3>
                    <textarea className="titleFormTextArea" onChange={handleDescriptionChange} name="description" id="" cols="26" placeholder="Ex. Talking about the best chocolate bars of the world!" rows="10"></textarea>
                </div>
                <button onClick={createRoom}>Create Room</button>
            </div>
        </div>
    )
}