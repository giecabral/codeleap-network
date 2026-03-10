const BASE_URL = 'https://dev.codeleap.co.uk/careers/'

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return [{
            "id": 77527,
            "username": "giovanna",
            "created_datetime": "2026-03-10T01:38:35.521390Z",
            "title": "My post",
            "content": "Content here sodubcsdceiuecw onwdoiwe oiwenodinw Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "author_ip": "189.114.192.75"
        }, {
            "id": 77529,
            "username": "admin",
            "created_datetime": "2026-03-06T01:38:35.521390Z",
            "title": "My old",
            "content": "Content here sodubcsdceiuecw onwdoiwe oiwenodinw Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "author_ip": "189.114.192.75"
        }, {
            "id": 77530,
            "username": "admin",
            "created_datetime": "2026-03-08T01:38:35.521390Z",
            "title": "My old",
            "content": "Content here sodubcsdceiuecw onwdoiwe oiwenodinw Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "author_ip": "189.114.192.75"
        }]
}

export async function createPost({ username, title, content }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, title, content }),
  })
  if (!res.ok) throw new Error('Failed to create post')
  return res.json()
}

export async function updatePost(id, { title, content }) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
  if (!res.ok) throw new Error('Failed to update post')
  return res.json()
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}${id}/`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete post')
}
