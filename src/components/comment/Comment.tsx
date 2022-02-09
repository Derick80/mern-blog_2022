import { useState } from "react"
import { createComment } from '../../hooks'

type Props = {
    createComment: any
}

const Comment = ({ createComment }: Props) => {
    const [toggleCommentForm, setToggleCommentForm] = useState(false)
    const [content, setContent] = useState('')
    return (<>
        <form onSubmit={createComment}>
            <textarea className='border border-separate m-auto w-full h-24'
                onChange={(e) => setContent(e.target.value)}
                placeholder='Leave a comment'
                rows={2}
                value={content}
            />
            <input disabled={!content} type='submit' value='Post a comment...' />
        </form>
    </>)
}

export default Comment