import HomePage from '../components/HomePage'
import pocketbaseEsDMts from 'pocketbase'
import Connection from '../components/Connection'



export default function Home() {
    const pb = new pocketbaseEsDMts("http://127.0.0.1:8090")
    const currentUser = pb.authStore.model;

    if (currentUser != null) {
        return (<HomePage />)
    } else {
        return(<Connection />)
    }
}