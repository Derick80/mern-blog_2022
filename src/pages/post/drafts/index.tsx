1import React from 'react'
import { GetServerSideProps } from 'next'
import PostCard from '../../../components/post/PostCard'
import { useSession, getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'
import { Alert, Typography } from '@mui/material'
import { Box } from '@mui/system'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: { drafts: JSON.parse(JSON.stringify(drafts)) },
  }
}

type Props = {
  drafts: PostProps[]
}

const Drafts = (props: Props) => {
  const [session] = useSession()

  if (!session) {
    return (
      <Alert onClose={() => { }}>
        You need to be authenticated to view this page.
      </Alert>
    )
  }

  return (
    <div className="card_container">

      {props.drafts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Drafts
