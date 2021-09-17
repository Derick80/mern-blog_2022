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
    <div >
      {props.map((item =>
        <div key={item.id} className="userInfo">
          <p >{item.nickname}</p>
          <p >{item.bio}</p>
          <p >{item.country}</p>
          <p >{item.avatar_url}</p>
          <a href={item.website} target="_blank" rel="noreferrer">
            {item.website}
          </a>
          <div >
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