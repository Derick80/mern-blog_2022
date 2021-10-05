import { Container, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { GetStaticProps } from 'next'
import React from 'react'
import PostCard from '../components/PostCard'
import Sidebar from '../components/Sidebar'
import prisma from '../utils/prisma'

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

const Index = (props: Props) => {

  return (


    <Container maxWidth="lg" >
      <Grid container spacing={5} sx={{ mt: 3 }}>
        {props.feed.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        <Sidebar />

      </Grid></Container>

  )
}

export default Index
