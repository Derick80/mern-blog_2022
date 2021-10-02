import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { Button, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useSession } from "next-auth/client"
import Router from 'next/router'
import React, { useState } from 'react'
import { deletePost, editPost, likePost, publishPost } from '../hooks'
import LikeButton from './LikeButton'


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

type Props = {
  post: PostProps;
};
const PostCard = ({ post }: Props) => {

  const [session] = useSession();
  const { id, title, content, author, likes, published, views } = post
  const [like, setLike] = useState()



  const authorName = author ? author.name : 'Unknown author'
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === author?.email
  if (published === true) {
    return (
      <Grid
      >
        <Card sx={{ maxWidth: 345, p: 5 }} key={post.id}>
          <CardContent>
            <Typography variant="h6" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2">
              {content}
            </Typography>
            <Typography variant="subtitle1">
              <br />
              Written by  {authorName}
            </Typography>
          </CardContent>
          <CardActions >
            <LikeButton post={post} />

            <Typography variant="subtitle1">
              Views: {views}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {userHasValidSession && postBelongsToUser && (
              <div>
                {' '}
                <Button variant="contained" color="primary" onClick={() => editPost(id)}>Edit</Button>

                <Button variant="contained" color="primary" onClick={() => deletePost(id)}>Delete</Button>
              </div>
            )}

          </CardActions>
        </Card>
      </Grid>
    )

  } else {
    return (
      <Grid
      >
        <Card sx={{ maxWidth: 345 }} key={post.id}>
          <CardContent>
            <Typography variant="h6" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2">
              {content}
            </Typography>
            <Typography variant="subtitle1">
              <br />
              Written by  {authorName}
            </Typography>
          </CardContent>
          <CardActions >

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {userHasValidSession && postBelongsToUser && (
              <div>
                {' '}
                <Button variant="contained" color="primary" onClick={() => publishPost(id)}>Publish</Button>

                <Button variant="contained" color="primary" onClick={() => deletePost(id)}>Delete</Button>
              </div>
            )}

          </CardActions>
        </Card>
      </Grid>
    )
  }

}

export default PostCard
