import Image from 'next/image'
import { useState } from 'react'
import EditProfile from '../pages/profile/edit'
import Avatar from './Avatar'

type Props = {
  props: (UserProfile)[]
}

const ProfilesCard: React.FC<Props> = ({ props }) => {
  console.log("profiles", props);
  return (<>
    <div className="w-full max-w-lg m-auto py-10 mt-10 px-10 border">
      {props.map((item =>
        <div key={item.id} className="userInfo">
          <p className="username">{item.nickname}</p>
          <p className="username">{item.bio}</p>
          <p className="username">{item.country}</p>
          <p className="username">{item.avatar_url}</p>
          <a className="website" href={item.website} target="_blank" rel="noreferrer">
            {item.website}
          </a>
          <div className="avatarContainer">
            <Avatar url={item.avatar_url} />
          </div>
        </div>
      ))
      }
    </div>
  </>
  )
}

export default ProfilesCard