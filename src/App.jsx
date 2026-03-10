import { useState } from 'react'
import LoginModal from './components/post/LoginModal.jsx'
import Feed from './components/post/Feed.jsx'

export default function App() {
  const [username, setUsername] = useState('')

  if (!username) {
    return <LoginModal onLogin={setUsername} />
  }

  return <Feed username={username} onLogout={() => setUsername('')} />
}
