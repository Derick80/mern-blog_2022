import Image from 'next/image'
import { useState } from 'react'
import EditProfile from '../pages/profile/edit'
import Avatar from '../components/Avatar'



export default function ProfileCard({ profile }: { profile: Profile }) {
  const [edit, setEdit] = useState(false)
  const {nickname, country, city, bio, avatar_url, website, id, userId, updatedAt}
= profile
  const lastUpdated = profile.updatedAt ? new Date() : null
console.log(nickname, country, city, bio, avatar_url, website, id, userId, updatedAt)
  const handleEditClick = (e: React.SyntheticEvent) => {
    setEdit(true)
  }
  if (edit === false) {
    profile
    return (<>

      <div className="w-full max-w-lg m-auto py-10 mt-10 px-10 border">

        <div className="userInfo">
          <p className="username">{profile.nickname}</p>
          <p className="username">{profile.bio}</p>
          <p className="username">{profile.country}</p>
          <p className="username">{profile.city}</p>
          <a className="website" href={profile.website} target="_blank" rel="noreferrer">
            {profile.website}
          </a>
          <div className="avatarField">
            <div className="avatarContainer">
              {profile.avatar_url ? (
                <Avatar url={profile.avatar_url} />
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
          <button type="submit" onClick={handleEditClick}>Edit</button>
        </div>

      </div>
    </>

    )
  }
  return (<EditProfile />)
}