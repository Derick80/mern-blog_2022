import React from 'react'
import { GetStaticProps } from 'next'

import prisma from '../utils/prisma'
import PostCard from '../components/CardPost'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
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
      <div className='container'>
        <h3>Public Feed</h3>{' '}
        {props.feed.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Blog
