import Image from 'next/image'
import { useState } from 'react'
import EditProfile from '../pages/profile/edit'
import Avatar from '../components/Avatar'


const ProfileCard= ({ nickname, country, city, bio, avatar_url, website, id, userId, updatedAt}: Profile)=> {
  // const [edit, setEdit] = useState(false)

  const lastUpdated = updatedAt ? new Date() : null
console.log(nickname, country, city, bio, avatar_url, website, id, userId, updatedAt)
 
  // if (edit === false) {
        return (<>

      <div className="w-full max-w-lg m-auto py-10 mt-10 px-10 border">

        <div className="userInfo">
          <p className="username">{nickname}</p>
          <p className="username">{bio}</p>
          <p className="username">{country}</p>
          <p className="username">{city}</p>
          <a className="website" href={website} target="_blank" rel="noreferrer">
            {website}
          </a>
          <div className="avatarField">
            <div className="avatarContainer">
              {avatar_url ? (
                <Avatar url={avatar_url} />
              ) : (
                <div className="avatarPlaceholder">?</div>
              )}
            </div>
          </div>
          <p>
            <small>
              Last updated{' '}
              {lastUpdated
                ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
                : 'Never'}
            </small>
          </p>
        
        </div>

      </div>
    </>

    )
  
}

export default ProfileCard