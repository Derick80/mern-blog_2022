import React from 'react'
import Router from 'next/router'

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div onClick={() => Router.push('/post/[id]', `/post/${post.id}`)}>
      <div className=' m-auto w-full max-w-lg rounded-lg ring-blue-700 flex-col' key={post.id}>
      <div className='border-solid m-auto py-2 w-full text-center font-bold text-xl'>Title:{post.title} </div>

      <p className='border border-separate m-auto w-full h-24 '>{post.content}</p>
      <p className='m-auto w-full text-right font-semibold'> Written by {authorName}</p>
    </div>
    </div>
  )
}

export default Post

     

