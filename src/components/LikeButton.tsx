import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button, Grid } from '@mui/material'
import { likePost, calculateLikeCount } from '../hooks';
import { useSession } from 'next-auth/client';
import React from 'react';
import Typography from '@mui/material/Typography'

type Props = {
    post: PostProps;
}

const LikeButton = ({ post }: Props) => {
    const [session] = useSession();

    const hasLiked = post.likes.find((like) => like.userId === session?.userId);
    const { author } = post
    const items = post.likes.map(item => item)
    const likeBelongsToUser = session?.user?.email === author?.email
    const body = items.map(itema => itema)
    // const {userId, postId, likeType}= body
    console.log(items);

    return (
        <>
            <Button variant="outlined"
                onClick={() => console.log("body", body)}

            >
                <ThumbUpOffAltIcon


                />
            </Button>
            <Typography variant="h6">{calculateLikeCount(post.likes)}</Typography>
        </>)
}


export default LikeButton