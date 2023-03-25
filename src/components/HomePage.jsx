import { Link } from 'react-router-dom'
import pocketbaseEsDMts from 'pocketbase'
import ProfileIcon from './ProfileIcon'


export default function HomePage() {

    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;

    function Logout() {
        pb.authStore.clear()
        window.location.reload(false);
    }

    return (
        <div className="App">
            <ProfileIcon />
            <h1 className="mainTitle">Welcome to KingSent</h1>
            <h2>Chat with everyone about anything you want!</h2>
            <Link to="/createRoom"><div className="buttonLight">Create a new Chat 🗿</div></Link>
            <Link to="/sendMessages/?ta4ktcp07a8cbel"><div className="buttonLight">Access the GENERAL Chat 👑</div></Link>

            {/* Temporary design */}
            <Link to="/my-rooms"><div className="buttonLight">My Rooms 📩</div></Link>
      </div>
    )
}