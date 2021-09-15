import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { useSession } from 'next-auth/client'
import {useQuery } from 'react-query'
import Image from 'next/image'
import Avatar from '../../components/Avatar'
import {useProfile, getProfile} from '../../hooks'



const UserProfile: React.FC = () => {
  const [session] = useSession()
const {data, status, error} = useProfile()

  console.log(data);
  
  
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
    
  </div>
  
  )
}

export default UserProfile
