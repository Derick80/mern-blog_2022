import Image from 'next/image'
import { useState } from 'react'
import EditProfile from '../pages/profile/edit'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UserAvatar from "../components/Avatar";
import LikeProfile from './LikeProfile';

import { Box } from '@mui/system'

type Props = {
  profile: UserProfile
}

const ProfilesCard = ({ profile }: Props) => {
  const { nickname, bio, city, country, website, likes, userId, avatar_url } = profile
  return (<Box component="div" sx={{ gridArea: 'main', bgcolor: 'secondary.main', display: 'block' }}>

    <Card component="div" key={profile.id} >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nickname}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {bio}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          {city}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          {country}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          {website}
        </Typography>
        <Avatar>
          <UserAvatar url={avatar_url} />      </Avatar>
      </CardContent>
      <CardActions>
        <LikeProfile profiles={profile} />
      </CardActions>
    </Card>





  </Box>
  )
}

export default ProfilesCard