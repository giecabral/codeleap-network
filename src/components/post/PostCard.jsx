import EditIcon from '../../assets/EditIcon'
import TrashIcon from '../../assets/TrashIcon'
import { timeAgo } from '../../utils/date'
import './PostCard.css'


export default function PostCard({ post, currentUsername, onEdit, onDelete }) {
  const isOwner = post.username === currentUsername

  return (
    <div className="post-card">
      <div className="post-header">
        <h3>{post.title}</h3>
        {isOwner && (
          <div className="post-actions">
            <button onClick={onDelete} title="Delete" className="icon-btn">
              <TrashIcon />
            </button>
            <button onClick={onEdit} title="Edit" className="icon-btn">
              <EditIcon />
            </button>
          </div>
        )}
      </div>
      <div className="post-body">
        <div className="post-meta">
          <span className="post-author">@{post.username}</span>
          <span className="post-time">{timeAgo(post.created_datetime)}</span>
        </div>
        <p className="post-content">{post.content}</p>
      </div>
    </div>
  )
}
