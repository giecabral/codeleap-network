import './DeleteModal.css'

export default function DeleteModal({ onClose, onConfirm, isLoading }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget && !isLoading) onClose()
  }

  return (
    <div className="delete-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal">
        <p>Are you sure you want to delete this item?</p>
        <div className="delete-modal-actions">
          <button className="btn btn-cancel" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button className="btn btn-delete" onClick={onConfirm} disabled={isLoading}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
