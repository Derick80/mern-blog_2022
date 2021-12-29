import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/client'
import React, { useState } from 'react'
import { calculateLikeCount, likePost } from '../hooks'


type Props = {
    post: PostProps
}

export default function LikeBox({ post }: Props) {
    const [session] = useSession()
    const hasLiked = post.likes.find((like) => like.userId === session?.id)


    let specialClassName = 'material-icons'
    let contentText = 'favorite'
    let inputText = ''
    let aria = false
    if (hasLiked?.likeType === 'LIKED') {
        specialClassName += ' red',
            contentText
        aria = true,
            inputText = 'UNLIKE'
    } else {
        specialClassName
        contentText += '_outline'
        aria = false,
            inputText = 'LIKED'
    }
    return (
        <button className="btn" type="button" role="switch" aria-checked={aria}

            onClick={() => likePost(post.id, inputText)}>

            <span className={specialClassName}>{contentText}</span>
        </button>
    )
}