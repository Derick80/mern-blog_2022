import React, { useState } from 'react'
import ProfileCard from './ProfileCard'
import EditProfile from '../pages/profile/edit'

type ProfileWrapperProps = {
   profile: Profile
   edits: boolean
}


const ProfileWrapper=({profile, edits}: ProfileWrapperProps): JSX.Element=>{
 
   if (edits === false){
      return (
        <ProfileCard {...profile} />)

    }else {
      return(
        <EditProfile profile={profile} />
      )

}
}
export default ProfileWrapper