import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/client'
import React from 'react'
import { calculateLikeCount, likeUserProfile } from '../hooks'

type Props = {
    profiles: UserProfile
}

const LikeUserProfile = ({ profiles }: Props) => {
    const [session] = useSession()
    const hasLiked = profiles.likes.find((like) => like.userId === session?.id)

    if (hasLiked?.likeType === 'LIKED') {
        return (
            <Stack direction="row" spacing={3}>
                <Button
                    variant='outlined'
                    color='info'
                    onClick={() => likeUserProfile(profiles.id, 'UNLIKE')}
                >
                    <ThumbUpIcon />
                </Button>
                <Typography variant='h6'>{calculateLikeCount(profiles.likes)}</Typography>
            </Stack>
        )
    } else {
        return (
            <Stack direction="row" spacing={3}>
                <Button variant='outlined' onClick={() => likeUserProfile(profiles.id, 'LIKED')}>
                    <ThumbUpOffAltIcon />
                </Button>
                <Typography variant='h6'>{calculateLikeCount(profiles.likes)}</Typography>
            </Stack>
        )
    }
}

export default LikeUserProfile
