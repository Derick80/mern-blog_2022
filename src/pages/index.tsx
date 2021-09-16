import React from 'react'
import { GetStaticProps } from 'next'
import prisma from '../utils/prisma'
import PostCard from '../components/CardPost'
import Left from '../components/Left'
import { useSession } from "next-auth/client"
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
  
      <>
  
      <div className="flex-col w-screen">

        {props.feed.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
          </div>
      </>
  
  )
}

export default Blog
