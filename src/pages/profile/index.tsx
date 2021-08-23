import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client'
import prisma from '../../utils/prisma'
import Layout from '../../components/Layout'
import React from 'react'
export const getServerSideProps: GetServerSideProps = async (
  req: any,
  res: any
) => {
  const session = await getSession({ req })
  //   if (!session) {
  //     return {
  //       props: { data: [] },
  //     }
  //   }

  const data = await prisma.profile.findFirst({
    where: {
      user: { email: session?.user.email },
    },
  })
  return {
    props: {
      data,
    },
  }
}

type Props = {
  data: UserProfilePageProps
}

const useProfile: React.FC<Props> = (props) => {
  const [session] = useSession()
  console.log(props)
  let items = props.data
  if (!session) {
    return (
      <Layout>
        <h1>My Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    )
  }

  return (
    <div>
      <div className='page'>
        <h1>My Profile</h1>
        <main>
          <div key={items.id}>
            <h2> {items.nickname} </h2>
            <p>{items.country}</p>
            <p>{items.city}</p>

            <p className=''>{items.bio} </p>
          </div>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  )
}

export default useProfile
