import React from 'react'
import { GetStaticProps } from 'next'
import prisma from '../utils/prisma'
import PostCard from '../components/CardPost'
import Left from '../components/Left'
import { useSession } from "next-auth/client"
import Container from '@mui/material/Container';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  })
  return {
    props: { feed: JSON.parse(JSON.stringify(feed)) },
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
 
  return (
  
      <Container maxWidth='sm'>
  
      <div>

        {props.feed.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
          </div>
      </Container>
  
  )
}

export default Blog
