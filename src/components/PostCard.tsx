import { Button, Divider, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useSession } from "next-auth/client"
import React from 'react'
import { deletePost, publishPost } from '../hooks'
import LikePost from './LikePost'
import PostUsersCard from './PostUsersCard'



type Props = {
  post: PostProps;
};
const PostCard = ({ post }: Props) => {

  const [session] = useSession();
  const { id, title, content, author, likes, published, views } = post



  const authorName = author ? author.name : 'Unknown author'
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === author?.email
  if (published === true) {
    return (
      <Grid item
        xs={12}
        md={8}
        sx={{}}

      >

        <Card component="div" key={post.id} sx={{ gridArea: 'main', display: 'block' }}>
          <CardContent>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {title}
            </Typography>
            <Divider />
            <Typography variant="body1">
              {content}
            </Typography>
            <Typography variant="caption">
              <br />
              Written by  {authorName}
            </Typography>
          </CardContent>
          <CardActions >

            <LikePost post={post} />

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Typography variant="subtitle1">
              Views: {views}
            </Typography>
            <Typography
              variant="h6"


            ></Typography>
            {userHasValidSession && postBelongsToUser && (
              <PostUsersCard id={id} />
            )}

          </CardActions>
        </Card>

      </Grid>
    )

  } else {

    return (
      <Grid item
        xs={12}
        md={8}
        sx={{}}

      >


        <Card component="div" key={post.id} sx={{ gridArea: 'main', display: 'block' }}>
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


            ></Typography>
            {userHasValidSession && postBelongsToUser && (
              <div>
                {' '}
                <Button component="span" sx={{ display: 'inline' }} variant="contained" color="primary" onClick={() => publishPost(id)}>Publish</Button>

                <Button component="span" sx={{ display: 'inline' }} variant="contained" color="primary" onClick={() => deletePost(id)}>Delete</Button>
              </div>
            )}

          </CardActions>
        </Card>



      </Grid>

    )
  }

}

export default PostCard
