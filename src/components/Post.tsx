import React from 'react'
import Router from 'next/router'

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div onClick={() => Router.push('/post/[id]', `/post/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <p>{post.content}</p>
    </div>
  )
}

export default Post
