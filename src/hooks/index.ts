
import {useQuery, useMutation  }from 'react-query'
import Router from 'next/router'



const getProfiles = async ()=>{

    const response = await fetch('http://localhost:8077/api/profiles', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
       
      })
    const data = await response.json()
    const {profile} = data
    return profile
}

const useProfile = ()=>{
    return useQuery('profiles', getProfiles)
}

async function publishPost(id: number): Promise<void> {
    await fetch(`http://localhost:8077/api/post/publish/${id}`, {
      method: 'PUT',
    })
    await Router.push('/')
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
  }export { useProfile, getProfiles, editPost, deletePost, publishPost}