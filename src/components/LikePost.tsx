import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/client'
import React from 'react'
import { calculateLikeCount, likePost } from '../hooks'

type Props = {
    post: PostProps
}

const LikePost = ({ post }: Props) => {
    const [session] = useSession()
    const hasLiked = post.likes.find((like) => like.userId === session?.id)

    if (hasLiked?.likeType === 'LIKED') {
        return (
            <Stack direction="row" spacing={3}>

                <Button
                    variant='contained'
                    color='info'
                    onClick={() => likePost(post.id, 'UNLIKE')}
                >
                    <ThumbUpIcon />
                </Button>
                <Typography variant='h6'>{calculateLikeCount(post.likes)}</Typography>

            </Stack>)
    } else {
        return (
            <Stack direction="row" spacing={3}>

                <Button variant='outlined'

                    onClick={() => likePost(post.id, 'LIKED')}>
                    <ThumbUpOffAltIcon />
                </Button>
                <Typography variant='h6'>{calculateLikeCount(post.likes)}</Typography>

            </Stack>)
    }
}

export default LikePost
