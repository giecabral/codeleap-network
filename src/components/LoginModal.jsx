import { useState } from 'react'
import './LoginModal.css'

export default function LoginModal({ onLogin }) {
  const [usernameInput, setUsernameInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = usernameInput.trim()
    if (trimmed) onLogin(trimmed)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Welcome to CodeLeap network!</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Please enter your username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Codeleap user"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary" disabled={!usernameInput.trim()}>
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
