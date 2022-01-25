/* eslint-disable @next/next/no-img-element */
import { Button, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useSession } from "next-auth/client"
import Image from 'next/image'
import React from 'react'
import { calculateLikeCount, deletePost, publishPost } from '../../hooks'
import LikeBox from '../LikeBox'
import PostUsersCard from '../PostUsersCard'
import { Avatar } from '@mui/material'
import PostImage from '../PostImage'
import Comments from '../comment/Comments'



type Props = {
  post: PostProps;
};
const PostCard = ({ post }: Props) => {

  const [session] = useSession();
  const { id, title, content, author, likes, published, views, postImage, comments } = post



  const authorName = author ? author.name : 'Unknown author'
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === author?.email
  if (published === true) {
    return (


      <div className="card" key={post.id} >
        <div className="card_header card_image">
          <PostImage url={postImage} />
        </div>
        <h2 className="card_header">{title}</h2>
        <div className="card_body">
          <p> {content}</p>

          <p >
            <br />
            Written by  {authorName}
          </p>
        </div>

        <div className="card_footer" >

          <LikeBox post={post} />
          <h3>{calculateLikeCount(post.likes)}</h3>

          Views: {views}

          {userHasValidSession && postBelongsToUser && (
            <PostUsersCard id={id} />
          )}

        </div>

      </div>


    )

  } else {

    return (
      <div className="card" key={post.id} >
        <div className="card_header card_image">
          <PostImage url={postImage} />
        </div>
        <h2 className="card_header">{title}</h2>
        <div className="card_body">
          <p> {content}</p>

          <p >
            <br />
            Written by  {authorName}
          </p>
        </div>

        <div className="card_footer" >
          {userHasValidSession && postBelongsToUser && (
            <div>
              {' '}
              <Button component="span" sx={{ display: 'inline' }} variant="contained" color="primary" onClick={() => publishPost(id)}>Publish</Button>

              <Button component="span" sx={{ display: 'inline' }} variant="contained" color="primary" onClick={() => deletePost(id)}>Delete</Button>
            </div>
          )}

        </div>
      </div>





    )
  }

}

export default PostCard
