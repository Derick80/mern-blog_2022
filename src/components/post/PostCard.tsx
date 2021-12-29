import { Button, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useSession } from "next-auth/client"
import React from 'react'
import { calculateLikeCount, deletePost, publishPost } from '../../hooks'
import LikeBox from '../LikeBox'
import PostUsersCard from '../PostUsersCard'




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

        <div className="card" key={post.id} >
          <div className="card_body">
            <div className="card_header">{title}</div>
            <div className="card_body">
              <p> {content}</p>

              <p >
                <br />
                Written by  {authorName}
              </p>
            </div>
          </div>
          <div className="card_actions" >

            <LikeBox post={post} />
            <Typography variant='h6'>{calculateLikeCount(post.likes)}</Typography>
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

          </div>
        </div>

      </Grid>
    )

  } else {

    return (
      <Grid item
        xs={12}
        md={8}
        sx={{}}

      >


        <div className="card" key={post.id} >
          <div className="card_header">{title}</div>
          <div className="card_body">
            <p> {content}</p>

            <p >
              <br />
              Written by  {authorName}
            </p>
          </div>
          <div className="card_actions" >

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

          </div>
        </div>



      </Grid>

    )
  }

}

export default PostCard
