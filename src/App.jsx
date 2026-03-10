import { useState } from 'react'
import LoginModal from './components/LoginModal.jsx'

export default function App() {
  const [username, setUsername] = useState('')

  if (\!username) {
    return <LoginModal onLogin={setUsername} />
  }

  return null
}
