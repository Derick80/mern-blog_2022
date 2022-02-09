import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { useState } from 'react'
import UserAvatar from './UserAvatar'
import EditProfile from '../pages/profile/edit'

import Image from 'next/image'

type Props = {
  profile: UserProfile
}
const ProfileCard = ({ profile: { nickname,
  country,
  city,
  bio,
  avatar_url,
  website,

  updatedAt } }: Props) => {


  const lastUpdated = updatedAt ? new Date() : null

  return (
    <div className="card_grid">
      <div className="profile_card">
        <div className="card_sidebar">
          <UserAvatar url={avatar_url} />
          <ul>
            <li></li>
          </ul>
        </div>
        <div className="card_body">
          <h2 className="profile_name">{nickname}</h2>
          <p className="profile_body">{bio}</p>
          <p className="profile_city">{city}</p>
          <p className="profile_country">{country}</p>
          <p className="profile_website">{website}</p>
        </div>
        <div className="card_footer">
          <p className="contact">email here email</p>
          <p className="updated_at">last update at</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
