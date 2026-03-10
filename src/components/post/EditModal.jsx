import { useState } from 'react'
import FormField from '../ui/FormField.jsx'
import './EditModal.css'

export default function EditModal({ post, onClose, onSave, isLoading }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const isEmpty = !title.trim() || !content.trim()

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget && !isLoading) onClose()
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (isEmpty) return
    onSave(title, content)
  }

  return (
    <div className="edit-overlay" onClick={handleOverlayClick}>
      <div className="edit-modal">
        <h4>Edit item</h4>
        <form onSubmit={handleSubmit}>
          <FormField
            id="edit-title"
            label="Title"
            placeholder="Hello world"
            text={title}
            setText={setTitle}
          />
          <FormField
            id="edit-content"
            label="Content"
            placeholder="Content here"
            text={content}
            setText={setContent}
            multiline
          />
          <div className="edit-modal-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-save"
              disabled={isEmpty || isLoading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
