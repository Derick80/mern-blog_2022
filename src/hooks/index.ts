import { useQuery } from 'react-query'
import Router from 'next/router'

//Create a Post -- working *
const createPost = async (
  title: string,
  content: string,
  postImage: string
) => {
  const body = { title, content, postImage }
  await fetch(`http://localhost:8077/api/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await Router.push('/post/drafts')
}
// Publish a draft of a post -- working *
async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/post/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

// get likes
const getLikes = async (postId: number) => {
  const response = await fetch('http://localhost:8077/api/likes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json()
  const { likes } = data
  return likes
}
const useLikes = () => {
  return useQuery('likes', getLikes)
}
// calculate likes as they are submitted -- working *
const calculateLikeCount = (likes: any[]) => {
  const addLike = likes.filter((like) => like.likeType === 'LIKED')
  const minusLike = likes.filter((like) => like.likeType === 'UNLIKED')

  const likeCount = addLike.length - minusLike.length
  return likeCount
}
// like or unlike a post with this function -- working *
async function likePost(postId: number, type: string): Promise<void> {
  const body = { postId, type }
  await fetch(`http://localhost:8077/api/post/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
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

const useProfile = () => {
  return useQuery('profiles', getProfiles)
}

// like or unlike a post with this function
async function likeUserProfile(
  userProfileId: number,
  type: string
): Promise<void> {
  const body = { userProfileId, type }
  await fetch(`http://localhost:8077/api/profiles/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await Router.reload()
}
const getUserProfile = async () => {
  const response = await fetch('http://localhost:8077/api/profile', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json()
  const { profile } = data
  return profile
}

const createUserProfile = async (
  nickname: string,
  country: string,
  city: string,
  bio: string,
  website: string,
  avatar_url: string
) => {
  const body = { nickname, country, city, bio, website, avatar_url }
  await fetch('http://localhost:8077/api/profile/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await Router.push('/profile')
}

const updateUserProfile = async (
  id: number,
  nicknames: string,
  countrys: string,
  citys: string,
  bios: string,
  websites: string
) => {
  const body = { id, nicknames, countrys, citys, bios, websites }
  await fetch('http://localhost:8077/api/profile/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await Router.push('/profile')
}

const getProfile = async () => {
  const response = await fetch('http://localhost:8077/api/profile', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json()
  const { profile } = data
  return profile
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

const createComment = async (
  e: React.SyntheticEvent,
  id: number,
  content: string
): Promise<void> => {
  e.preventDefault()
  const body = { content }
  const response = await fetch(`http://localhost:8077/api/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

// calculate likes as they are submitted -- working *
const calculateViewCount = (likes: any[]) => {
  const addLike = likes.filter((like) => like.likeType === 'LIKED')
  const minusLike = likes.filter((like) => like.likeType === 'UNLIKED')

  const likeCount = addLike.length - minusLike.length
  return likeCount
}
export {
  useProfile,
  getProfiles,
  editPost,
  deletePost,
  publishPost,
  likePost,
  createPost,
  getUserProfile,
  calculateLikeCount,
  createUserProfile,
  updateUserProfile,
  likeUserProfile,
  createComment,
  getLikes,
}
