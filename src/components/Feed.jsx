import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost, updatePost, deletePost } from '../api.js'
import { useToast } from '../hooks/useToast.js'
import CreatePost from './CreatePost.jsx'
import PostCard from './PostCard.jsx'
import PostCardSkeleton from './PostCardSkeleton.jsx'
import FeedControls from './FeedControls.jsx'
import DeleteModal from './DeleteModal.jsx'
import EditModal from './EditModal.jsx'
import EmptyState from './EmptyState.jsx'
import Toast from './Toast.jsx'
import './Feed.css'

const SKELETON_MOCK = [1, 2]

export default function Feed({ username }) {
  const queryClient = useQueryClient()
  const [deletingPost, setDeletingPost] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
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

  const updateMutation = useMutation({
    mutationFn: ({ id, title, content }) => updatePost(id, { title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setEditingPost(null)
      showToast('Post updated!', 'success')
    },
    onError: () => { showToast('Failed to update post. Try again.', 'error'); setEditingPost(null) },
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

  const posts = [...(data?.results ?? [])]
    .filter((post) =>
      post.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const diff = new Date(b.created_datetime) - new Date(a.created_datetime)
      return sortOrder === 'desc' ? diff : -diff
    })

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

        <FeedControls
          search={search}
          onSearchChange={setSearch}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {isLoading && SKELETON_MOCK.map((i) => <PostCardSkeleton key={i} />)}

        {posts.length > 0 ? posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUsername={username}
            onEdit={() => setEditingPost(post)}
            onDelete={() => setDeletingPost(post)}
          />
        )) : <EmptyState filtered={!!search} />}
      </div>

      {editingPost && (
        <EditModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={(title, content) =>
            updateMutation.mutate({ id: editingPost.id, title, content })
          }
          isLoading={updateMutation.isPending}
        />
      )}

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
