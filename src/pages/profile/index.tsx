import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { useSession } from 'next-auth/client'
import Image from 'next/image'
import Avatar from '../../components/Avatar'
import {useProfile, getProfile} from '../../hooks'



const useProfile: React.FC = () => {
  const [session] = useSession()


  
  
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
      <div className="form-widget">
    {/* Add to the body */}
    <Avatar
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, website, avatar_url: url })
      }}
    />
    {/* ... */}
  </div>
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
