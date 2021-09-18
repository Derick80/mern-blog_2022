import React from 'react'
import { GetServerSideProps } from 'next'
import PostCard from '../../../components/CardPost'
import { useSession, getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'

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

const Drafts: React.FC<Props> = (props) => {
  const [session] = useSession()

  if (!session) {
    return (
      <div>
        <h3>My Drafts</h3>
        <div>You need to be authenticated to view this page.</div>
      </div>
    )
  }

  return (
    <div >
      <h3>My Drafts</h3>

      {props.drafts.map((post) => (
        <PostCard key={post.id}
          post={post} />
       
      ))}
    </div>
  )
}

export default Drafts
