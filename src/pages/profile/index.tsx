import React, {useState, useEffect,ChangeEvent}from 'react'
import prisma from '../../utils/prisma'
import { useSession, getSession } from 'next-auth/client'
import {useQuery } from 'react-query'
import Image from 'next/image'
import Avatar from '../../components/Avatar'
// import {useProfile, getProfile} from '../../hooks'

import CreateProfile from './create'
import ProfileCard from '../../components/ProfileCard'
import UploadButton from '../../components/uploadButton'

import { DEFAULT_AVATARS_BUCKET } from '../../utils/constants'

const UserProfile= () => {
//   const [nickname, setNickname] =useState<any>('')
//   const [country, setCountry] =useState<any>(null)
//   const [city, setCity] =useState<any>(null)
//   const [bio, setBio] =useState<any>(null)
// const [website,setWebsite] =useState<any>(null)
// const [id,setId] =useState<number>(0)
// const [avatar_url, setAvatarUrl] =useState<any>(null)
// const [uploading, setUploading] = useState<boolean>(false)

  const [session] = useSession()

 const getProfile = async ()=>{

  const response = await fetch('http://localhost:8077/api/profile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
     
    })
  const data = await response.json()
  const {profile} = data
  return profile

}

const {data:profile, status, error} = useQuery('profile', getProfile)
// const {nickname, country, city, bio, avatar_url, website, id, userId, updatedAt} = profile

//  function setProfile(profile:Profile) {
//   setId(profile?.id)
//   setAvatarUrl(profile?.avatar_url)
//   setNickname(profile?.nickname)
//   setCountry(profile?.country)
//   setCity(profile?.city)
//   setBio(profile?.bio)
//   setWebsite(profile?.website)
// }

//   useEffect(() => {
//     setProfile
//     return () => {
//       setProfile
//     }
//   }, [profile])

  // console.log(nickname, country, city, bio, avatar_url, website, id, userId, updatedAt)

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
