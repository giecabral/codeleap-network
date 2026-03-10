import { useState } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost, updatePost, deletePost } from '../../api/api.js'
import { useToast } from '../../hooks/useToast.js'
import CreatePost from './CreatePost.jsx'
import PostCard from './PostCard.jsx'
import PostCardSkeleton from './PostCardSkeleton.jsx'
import FeedControls from './FeedControls.jsx'
import DeleteModal from './DeleteModal.jsx'
import EditModal from './EditModal.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Toast from '../ui/Toast.jsx'
import './Feed.css'
import LogoutIcon from '../../assets/LogoutIcon.jsx'

const SKELETON_MOCK = [1, 2]

export default function Feed({ username, onLogout }) {
  const queryClient = useQueryClient()
  const [deletingPost, setDeletingPost] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const { toast, showToast } = useToast()

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: fetchPosts,
    initialPageParam: 'https://dev.codeleap.co.uk/careers/',
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  })

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] })
      showToast('Post created!', 'success')
    },
    onError: () => showToast('Failed to create post. Try again.', 'error'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, title, content }) => updatePost(id, { title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] })
      setEditingPost(null)
      showToast('Post updated!', 'success')
    },
    onError: () => { showToast('Failed to update post. Try again.', 'error'); setEditingPost(null) },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] })
      setDeletingPost(null)
      showToast('Post deleted.', 'success')
    },
    onError: () => { showToast('Failed to delete post. Try again.', 'error'); setDeletingPost(null) },
  })

  const allResults = data?.pages.flatMap((page) => page.results) ?? []
  const posts = [...allResults]
    .filter((post) =>
      post.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const diff = new Date(b.created_datetime) - new Date(a.created_datetime)
      return sortOrder === 'desc' ? diff : -diff
    })

  return (
    <div className="feed-overlay">
      <header>
        <span>CodeLeap Network</span>
        <button className="logout-btn" onClick={onLogout}><LogoutIcon /></button>
      </header>
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
        )) : !isLoading && <EmptyState filtered={!!search} />}

        {hasNextPage && (
          <button
            className="load-more-btn"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        )}
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
