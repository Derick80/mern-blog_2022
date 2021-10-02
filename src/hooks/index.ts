import { useQuery, useMutation } from 'react-query'
import Router from 'next/router'

const createPost = async (title: string, content: string) => {
  const body = { title, content }
  await fetch(`http://localhost:8077/api/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await Router.push('/post/drafts')
}

const getProfiles = async () => {
  const response = await fetch('http://localhost:8077/api/profiles', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json()
  const { profile } = data
  return profile
}
async function unlikePost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/post/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  await Router.push('/')
}

const calculateLikeCount = (likes: any[]) => {
  const addLike = likes.filter((like) => like.likeType === 'LIKED')
  const minusLike = likes.filter((like) => like.likeType === 'UNLIKED')

  const likeCount = addLike.length - minusLike.length
  return likeCount
}

const useProfile = () => {
  return useQuery('profiles', getProfiles)
}

async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/post/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function likePost(body: string): Promise<void> {
  await fetch(`http://localhost:8077/api/post/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

async function editPost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/post/edit/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}
async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

export {
  useProfile,
  getProfiles,
  editPost,
  deletePost,
  publishPost,
  unlikePost,
  likePost,
  createPost,
  calculateLikeCount,
}
