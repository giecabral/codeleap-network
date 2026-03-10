import './PostCardSkeleton.css'

export default function PostCardSkeleton() {
  return (
    <div className="post-card-skeleton">
      <div className="post-card-skeleton-header">
        <div className="sk sk-post-title" />
      </div>
      <div className="post-card-skeleton-body">
        <div className="post-card-skeleton-meta">
          <div className="sk sk-author" />
          <div className="sk sk-time" />
        </div>
        <div className="sk sk-line" />
        <div className="sk sk-line" />
        <div className="sk sk-line sk-line-short" />
      </div>
    </div>
  )
}
