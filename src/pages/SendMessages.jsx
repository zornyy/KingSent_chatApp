import { Link } from "react-router-dom"
import { useLocation } from "react-router"
import pocketbaseEsDMts from "pocketbase"
import { useEffect, useRef, useState } from "react"
import Message from "../components/Message"
import '../styles/SendMessages.css'

export default function SendMessages() {
    const [message, setMessage] = useState("");
    const [chatRoomName, setChatRoomName] = useState("Send Something");
    const [messagesList, setMessagesList] = useState([]);
    const [chatRoomId, setChatRoomId] = useState((useLocation().search).replace('?', ''))
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;
    const dummy = useRef()
    
    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }


    useEffect(() => {
        fetchMessages()
        getChatName()

        pb
        .collection('messages')
        .subscribe('*', async ({action, record}) => {
            fetchMessages()
        })
    }, []);

    async function getChatName() {
        const result = await pb.collection("chat_room").getOne(chatRoomId);
        setChatRoomName(result.name)
    }

    async function fetchMessages(event) {
        const resultList = await pb.collection('messages').getList(1, 50, {
            sort: 'created',
            expand: 'user_id, chat_room_id',
            filter: `chat_room_id="${chatRoomId}"`,

        })

        setMessagesList(resultList.items);
    }
    

    async function createMessage(event) {
        event.preventDefault();

        const data = {
            content: message,
            user_id: currentUser.id,
            chat_room_id: chatRoomId,
        }

        if (message == '') {
            console.log("Can't send empty message")
        } else {
            try {
                const createdMessage = await pb.collection('messages').create(data);
                document.getElementById("messageInput").value = ""
                setMessage("")
            } catch {
                console.log("Message could not be sent")
            }
        }
    }

    return (
        <div className="SendMessagePage">
            <Link to="/"> 
                <div className="pageTitle">
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.41625 14.0411L20.0376 4.7488C21.2873 3.65218 23.25 4.54343 23.25 6.20774L23.25 24.7922C23.2503 25.1647 23.1433 25.5294 22.9417 25.8426C22.7401 26.1558 22.4525 26.4042 22.1133 26.5582C21.7741 26.7121 21.3978 26.765 21.0293 26.7106C20.6608 26.6561 20.3158 26.4966 20.0357 26.2512L9.41819 16.9589C9.21008 16.7771 9.04329 16.5528 8.92901 16.3012C8.81473 16.0495 8.7556 15.7764 8.7556 15.5C8.7556 15.2236 8.81473 14.9505 8.92901 14.6988C9.04329 14.4472 9.21008 14.2229 9.41819 14.0411H9.41625Z" fill="#D9D9D9"/>
                    </svg>
                    <h2>{chatRoomName}</h2> 
                </div>
            </Link>
            <div className="sendMessage_content">
                <div className="messagesContainer">
                    {messagesList.map((item, index) => <Message key={index} Icontent={item.content} Iuser={item.expand?.user_id?.username} />)}

                
                <div ref={dummy}></div>
                </div>
                <div className="messageField">
                    <div className="buttonsContainer">
                        <input id="messageInput" className="messageInput" onChange={handleMessageChange} type="text" placeholder="Type here..." />

                        <div onClick={createMessage} className="sendButton">
                            <img src="/send-fill.svg" />
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>    
    )
}