import './EmptyState.css'

export default function EmptyState({ filtered }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7695EC" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <p className="empty-state-title">
        {filtered ? 'No posts found' : 'No posts yet'}
      </p>
      <p className="empty-state-subtitle">
        {filtered
          ? 'Try a different username to search for.'
          : 'Be the first to share something!'}
      </p>
    </div>
  )
}
