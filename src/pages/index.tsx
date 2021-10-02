import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { GetStaticProps } from 'next'
import React from 'react'
import PostCard from '../components/PostCard'
import { Sidebar } from '../components/Sidebar'
import prisma from '../utils/prisma'
import { useSession } from "next-auth/client";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      comments: true,
      likes: true,
      author: {
        select: {
          name: true,
          email: true,

        },
      },
    },
    orderBy: [
      { updatedAt: 'desc' },
      { createdAt: 'desc' },
    ]
  })
  return {
    props: { feed: JSON.parse(JSON.stringify(feed)) },
  }
}

type Props = {
  feed: PostProps[]
}

const Index: React.FC<Props> = (props) => {

  return (


    <Grid container item spacing={5} sx={{ mt: 3 }}>
      <Box sx={{ flexGrow: 1, display: 'block', p: 5, m: 2 }}>

        {props.feed.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
      <Sidebar />
    </Grid>
  )
}

export default Index
