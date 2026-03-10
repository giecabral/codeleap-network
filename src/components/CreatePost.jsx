import { useState } from 'react'
import FormField from './FormField.jsx'
import './CreatePost.css'

export default function CreatePost({ username, onSubmit, isLoading }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const isEmpty = !title.trim() || !content.trim()

  function handleSubmit(e) {
    e.preventDefault()
    if (isEmpty) return
    onSubmit(title, content)
    setTitle('')
    setContent('')
  }

  return (
    <div className="create-post">
      <h4>Hello {username}! What's on your mind?</h4>
      <form onSubmit={handleSubmit}>
        <FormField
          id="post-title"
          label="Title"
          placeholder="Hello world"
          text={title}
          setText={setTitle}
        />
        <FormField
          id="post-content"
          label="Content"
          placeholder="Content here"
          text={content}
          setText={setContent}
          multiline
        />
        <div className="create-post-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isEmpty || isLoading}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
