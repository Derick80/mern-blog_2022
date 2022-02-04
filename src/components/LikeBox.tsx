import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/client'
import React, { useState } from 'react'
import { calculateLikeCount, likePost } from '../hooks'


type Props = {
    postId: number
    likes: Like[]
}

export default function LikeBox({ postId, likes }: Props) {
    const [session] = useSession()
    const [inputStuff, setInputStuff] = useState()
    const hasLiked = likes.find((like) => like.userId === session?.id)


    let specialClassName = 'material-icons'
    let contentText = 'thumb_up'
    let inputText = ''
    let aria = false
    if (hasLiked?.likeType === 'LIKED') {
        specialClassName += ' blue',
            contentText
        aria = true,
            inputText = 'UNLIKE'
    } else {
        specialClassName += '-outlined'
        contentText
        aria = false,
            inputText = 'LIKED'
    }
    return (
        <div className="like_box">

            <button className="btn" type="button" role="switch" aria-checked={aria}

                onClick={() => likePost(postId, inputText)}>

                <span className={specialClassName}>{contentText}</span>

                Like
            </button>


        </div>

    )
}