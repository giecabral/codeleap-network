import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost, deletePost } from '../api.js'
import { useToast } from '../hooks/useToast.js'
import CreatePost from './CreatePost.jsx'
import PostCard from './PostCard.jsx'
import PostCardSkeleton from './PostCardSkeleton.jsx'
import DeleteModal from './DeleteModal.jsx'
import Toast from './Toast.jsx'
import './Feed.css'

const SKELETON_MOCK = [1, 2, 3]

export default function Feed({ username }) {
  const queryClient = useQueryClient()
  const [deletingPost, setDeletingPost] = useState(null)
  const { toast, showToast } = useToast()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      showToast('Post created!', 'success')
    },
    onError: () => showToast('Failed to create post. Try again.', 'error'),
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setDeletingPost(null)
      showToast('Post deleted.', 'success')
    },
    onError: () => { showToast('Failed to delete post. Try again.', 'error'); setDeletingPost(null) },
  })

  const posts = [...(data ?? [])].sort(
    (a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)
  )

  return (
    <div className="feed-overlay">
      <header>CodeLeap Network</header>
      <div className="feed">
        <CreatePost
          username={username}
          onSubmit={(title, content) =>
            createMutation.mutate({ username, title, content })
          }
          isLoading={createMutation.isPending}
        />

        {isLoading && SKELETON_MOCK.map((i) => <PostCardSkeleton key={i} />)}
        {isError && <p>Failed to load posts.</p>}

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUsername={username}
            onEdit={() => { }}
            onDelete={() => setDeletingPost(post)}
          />
        ))}
      </div>

      {deletingPost && (
        <DeleteModal
          onClose={() => setDeletingPost(null)}
          onConfirm={() => deleteMutation.mutate(deletingPost.id)}
          isLoading={deleteMutation.isPending}
        />
      )}

      <Toast message={toast?.message} type={toast?.type} />
    </div>
  )
}
