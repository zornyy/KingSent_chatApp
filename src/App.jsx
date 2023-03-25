import './App.css'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import CreateRoom from './pages/CreateRoom'
import SendMessages from './pages/SendMessages'

import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router'
import { Routes } from 'react-router'
import NotFound from './pages/NotFound'
import EdigProfile from './pages/EditProfile'
import MyRooms from './pages/MyRooms'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/sendMessages" element={<SendMessages />} />
        <Route path="/edit-profile" element={<EdigProfile />} />
        <Route path="/my-rooms" element={<MyRooms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// export default App