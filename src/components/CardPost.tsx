import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    bold: true,
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
})

const PostCard: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'

  return (
    <div className='card' key={post.id}>
      <div className='card-cardtitle'>{post.title} </div>

      <p className='card-content'>{post.content}</p>
      <p className='card-author'> Written by {authorName}</p>

      <div className='card-actions'>
        <button onClick={() => Router.push('/post/[id]', `/post/${post.id}`)}>
          Edit or Delete
        </button>
      </div>
    </div>
  )
}

export default PostCard
