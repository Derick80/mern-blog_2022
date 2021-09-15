import { GetServerSideProps, NextApiRequest, GetStaticProps } from 'next'
import prisma from '../../utils/prisma'
import { useSession } from 'next-auth/client'
import {useQuery } from 'react-query'
import Image from 'next/image'
import Avatar from '../../components/Avatar'
import {useProfile, getProfile} from '../../hooks'
import CreateProfile from './create'
import ProfileCard from '../../components/ProfileCard'


const UserProfile= () => {
  const [session] = useSession()
const {data:profile, status, error} = useQuery('profile', getProfile)

 console.log("profile", profile);
 
  
  
  if (!session) {
    return (
      <div>
        <h1>My Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </div>
    )
  }else if
    (status === 'loading' ){
      return(
        <div>
      profile is loading
        </div>
      )
    
    }else if (status === 'success' && !profile){
      return(
        <div>
      <CreateProfile /> 
        </div>
      )
    
    }
    else if (status === 'success' && profile){
      return (
        <div>
        <ProfileCard profile={profile} />
      </div>
      
      )
    }else{
      return(<div>Nothing to see here</div>)
    }
  }

 


export default UserProfile
