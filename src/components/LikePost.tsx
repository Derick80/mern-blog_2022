import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Box, Button } from '@mui/material'
import { likePost, calculateLikeCount } from '../hooks'
import { useSession } from 'next-auth/client'
import React from 'react'
import Typography from '@mui/material/Typography'

type Props = {
    post: PostProps
}

const LikePost = ({ post }: Props) => {
    const [session] = useSession()
    const hasLiked = post.likes.find((like) => like.userId === session?.id)
    // console.log('HASLIKED', hasLiked)
    // console.log(session)
    if (hasLiked?.likeType === 'LIKED') {
        return (
            <Box component="div" display="flex">
                <Button
                    variant='contained'
                    color='info'
                    onClick={() => likePost(post.id, 'UNLIKE')}
                >
                    <ThumbUpIcon />
                </Button>
                <Typography variant='h6'>{calculateLikeCount(post.likes)}</Typography>
            </Box>
        )
    } else {
        return (
            <Box component="div" display="flex">
                <Button variant='outlined'

                    onClick={() => likePost(post.id, 'LIKED')}>
                    <ThumbUpOffAltIcon />
                </Button>
                <Typography variant='h6'>{calculateLikeCount(post.likes)}</Typography>
            </Box>
        )
    }
}

export default LikePost
