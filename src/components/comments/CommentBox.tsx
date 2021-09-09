import { useState } from 'react'
export interface CommentBoxProps {
  id: string
  content: string
}

const CommentBox: React.FC<CommentBoxProps> = () => {
  const [comment, setComment] = useState([])

  return (
    <div className='comment-box'>
      <textarea
        cols={50}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Add a comment...'
        rows={8}
        value={content}
      />
      <input disabled={!content} type='submit' value='Post comment' />
    </div>
  )
}

export default CommentBox
