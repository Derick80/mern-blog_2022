import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Box, Button } from '@mui/material'
import { likeUserProfile, calculateLikeCount } from '../hooks'
import { useSession } from 'next-auth/client'
import React from 'react'
import Typography from '@mui/material/Typography'

type Props = {
    profiles: UserProfile
}

const LikeUserProfile = ({ profiles }: Props) => {
    const [session] = useSession()
    const hasLiked = profiles.likes.find((like) => like.userId === session?.id)
    // console.log('HASLIKED', hasLiked)
    // console.log(session)
    if (hasLiked?.likeType === 'LIKED') {
        return (
            <Box component="div">
                <Button
                    variant='outlined'
                    color='info'
                    onClick={() => likeUserProfile(profiles.id, 'UNLIKE')}
                >
                    <ThumbUpIcon />
                </Button>
                <Typography variant='h6'>{calculateLikeCount(profiles.likes)}</Typography>
            </Box>
        )
    } else {
        return (
            <>
                <Button variant='outlined' onClick={() => likeUserProfile(profiles.id, 'LIKED')}>
                    <ThumbUpOffAltIcon />
                </Button>
                <Typography variant='h6'>{calculateLikeCount(profiles.likes)}</Typography>
            </>
        )
    }
}

export default LikeUserProfile
