import Router from 'next/router'
import Image from 'next/image'
import likeImage from '../../public/img/iconmonstr-heart-thin.svg'
import Comment from '../pages/post/comment'
async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/post/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  await Router.push('/')
}
async function likePost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/like/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  })
  await Router.push('/')
}
const PostCard: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'

  return (
    <div className='max-w-lg rounded md:rounded-lg ring-blue-700' key={post.id}>
      <div className='border-solid m-auto py-2 w-full text-center font-bold text-xl'>Title:{post.title} </div>

      <p className='border border-separate m-auto w-full h-24 '>{post.content}</p>
      <p className='m-auto w-full text-right font-semibold'> Written by {authorName}</p>
      <div className='card-stats-action flex justify-end'>
        <Image onClick={() => likePost(post.id)} src={likeImage} alt='like' />
        liked by: {post.likes}
      </div>

      <div className='owner-card-actions'>
        <button onClick={() => deletePost(post.id)}> Delete</button>
      </div>
      <Comment />
    </div>
  )
}

export default PostCard
