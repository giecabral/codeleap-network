import './FeedControls.css'

export default function FeedControls({ search, onSearchChange, sortOrder, onSortChange }) {
  return (
    <div className="feed-controls">
      <input
        className="feed-search"
        type="text"
        placeholder="Filter by username..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button
        className="feed-sort-btn"
        onClick={() => onSortChange(sortOrder === 'desc' ? 'asc' : 'desc')}
        title="Toggle sort order"
      >
        {sortOrder === 'desc' ? '↓ Latest first' : '↑ Oldest first'}
      </button>
    </div>
  )
}
