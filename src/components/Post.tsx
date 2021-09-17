import React from 'react'
import Router from 'next/router'

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div onClick={() => Router.push('/post/[id]', `/post/${post.id}`)}>
      <div  key={post.id}>
      <div >Title:{post.title} </div>

      <p >{post.content}</p>
      <p > Written by {authorName}</p>
    </div>
    </div>
  )
}

export default Post

     

