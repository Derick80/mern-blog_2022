import React from 'react'
import { GetServerSideProps } from 'next'
import {deletePost, publishPost, editPost} from '../../hooks'
import prisma from '../../utils/prisma'
import { useSession } from 'next-auth/client'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  }
}


type Props = {
  post: PostProps
}
const Post: React.FC<Props> = (props) => {
  console.log(props)

  const [session, loading] = useSession()
  if (loading) {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.post.author?.email
  let title = props.post.title
  if (!props.post.published) {
    title = `${title} (Draft)`
  }

  return (
    <div>
      <div className=' m-auto w-full max-w-lg rounded-lg ring-blue-700 flex-col' key={props.post.id}>
      <div className='border-solid m-auto py-2 w-full text-center font-bold text-xl'>Title:{props.post.title} </div>

      <p className='border border-separate m-auto w-full h-24 '>{props.post.content}</p>
      <p className='m-auto w-full text-right font-semibold'> Written by {props?.post.author?.name || "unknown Author"}</p>
 
      {!props.post.published && userHasValidSession && postBelongsToUser && (
        <button onClick={() => publishPost(props.post.id)}>Publish</button>
      )}
      {userHasValidSession && postBelongsToUser && (
        <div>
          {' '}
          <button onClick={() => editPost(props.post.id)}>Edit</button>
          <br />
          <button onClick={() => deletePost(props.post.id)}>Delete</button>
        </div>
      )}
    </div>
    </div>
  )
}

export default Post
