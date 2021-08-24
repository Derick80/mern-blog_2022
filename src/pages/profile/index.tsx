import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { useSession, getSession } from 'next-auth/client'
import prisma from '../../utils/prisma'
import Image from 'next/image'
export const getServerSideProps: GetServerSideProps = async (
  req: NextApiRequest,
  res: NextApiResponse
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
      <div>
        <h1>My Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </div>
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
          {session.user.image && (
            <Image
              className='navbar-image'
              src={session.user.image}
              alt='myimage'
              width='60'
              height='60'
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default useProfile
