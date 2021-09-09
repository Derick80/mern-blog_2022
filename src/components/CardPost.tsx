import Router from 'next/router'
import Image from 'next/image'
import likeImage from '../../public/img/iconmonstr-heart-thin.svg'
import Comment from '../pages/post/comment'
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
    <div className='card' key={post.id}>
      <div className='card-cardtitle'>{post.title} </div>

      <p className='card-content'>{post.content}</p>
      <p className='card-author'> Written by {authorName}</p>
      <div className='card-stats-action'>
        <Image onClick={() => likePost(post.id)} src={likeImage} alt='like' />
        liked by: {post.likes}
      </div>

      <div className='owner-card-actions'>
        <button onClick={() => Router.push('/post/[id]', `/post/${post.id}`)}>
          Edit or Delete
        </button>
      </div>
      <Comment />
    </div>
  )
}

export default PostCard
