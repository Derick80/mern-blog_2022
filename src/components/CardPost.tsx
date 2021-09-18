import React, {useState}from 'react'
import Router from 'next/router'
import {editPost, deletePost} from '../hooks/'
import Image from 'next/image'
import likeImage from '../../public/img/iconmonstr-heart-thin.svg'
import Comment from '../pages/post/comment'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Button, IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useSession, getSession, session } from "next-auth/client";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const handleLike =(event: React.MouseEvent<HTMLButtonElement>)=>{
console.log(event)

}

async function unlikePost(id: number): Promise<void> {


  await fetch(`http://localhost:8077/api/post/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  await Router.push('/')
}
async function likePost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/like/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  })
  await Router.push('/')
}
const PostCard: React.FC<{ post: PostProps }> = ({ post }) => {

  const [session] = useSession();
const { id, title, content, author, likes}= post
  const [like, setLike]= useState()

  const authorName = author ? author.name : 'Unknown author'
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === author?.email
  return (
    <form>
      <div  key={post.id}>
      <div >Title:{title} </div>

      <p >{content}</p>
      <p > Written by {authorName}</p>
      <div >
        <button 
        onClick={handleLike}

        >
     <ThumbUpOffAltIcon
     color={like ? 'primary' : 'disabled'}
     
     />
      </button>{' '}
        {likes}
      </div>
      {userHasValidSession && postBelongsToUser && (
        <div>
          {' '}
          <button onClick={() => editPost(id)}>Edit</button>
          <br />
          <button onClick={() => deletePost(id)}>Delete</button>
        </div>
      )}

    
    </div>

    </form>
    
  
  )
}

export default PostCard
