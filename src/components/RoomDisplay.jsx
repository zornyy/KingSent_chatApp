import { useEffect, useState } from "react";
import pocketbaseEsDMts from "pocketbase"
import { Link } from "react-router-dom";

export default function RoomDisplay({Iname , Idescription, Iid}, ) {
    const [name, setName] = useState(Iname);
    const [description, setDescription] = useState(Idescription);
    const [id, setId] = useState(Iid);

    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;

    return (
        <Link to={"/display-room/?" + id} className="RoomDisplayRow whiteText">
            <div>
                {name}
            </div>
            <div>
                {description}
            </div>
        </Link>


    )
}