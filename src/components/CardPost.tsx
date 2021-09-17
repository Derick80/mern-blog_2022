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
    <div  key={post.id}>
      <div >Title:{post.title} </div>

      <p >{post.content}</p>
      <p > Written by {authorName}</p>
      <div >
        <Image onClick={() => likePost(post.id)} src={likeImage} alt='like' />
        liked by: {post.likes}
      </div>

      <div >
        <button onClick={() => deletePost(post.id)}> Delete</button>
      </div>
      <Comment />
    </div>
  
  )
}

export default PostCard
