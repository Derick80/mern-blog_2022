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
    console.log(session);

    const hasLiked = post.likes.find((like) => like.userId === session?.id);

    const items = post.likes.map(item => item)

    const body = items.map(itema => itema)


    console.log("HASLIKED", hasLiked);

    if (hasLiked?.likeType === "LIKED") {
        return (
            <>
                <Button variant="outlined" color="info"
                    onClick={() => likePost(post.id, "UNLIKE")}

                >
                    <ThumbUpIcon


                    />
                </Button>
                <Typography variant="h6">{calculateLikeCount(post.likes)}</Typography>
            </>)
    } else {
        return (
            <>
                <Button variant="outlined"
                    onClick={() => likePost(post.id, "LIKED")}

                >
                    <ThumbUpOffAltIcon


                    />
                </Button>
                <Typography variant="h6">{calculateLikeCount(post.likes)}</Typography>
            </>

        )
    }
}


export default LikeButton