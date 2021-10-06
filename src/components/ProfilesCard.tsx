import { Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import UserAvatar from '../components/Avatar'
import LikeProfile from './LikeProfile'



type Props = {
  profile: UserProfile
}

const ProfilesCard = ({ profile }: Props) => {
  const { nickname, bio, city, country, website, likes, userId, avatar_url, views } =
    profile
  return (
    <Grid item
      xs={12}
      md={8}
      sx={{}}

    >
      <Card component='div' key={profile.id}>
        <CardContent>
          <Avatar>
            <UserAvatar url={avatar_url} />{' '}
          </Avatar>
          <Typography gutterBottom variant='h5' component='div'>
            {nickname}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {bio}
          </Typography>
          <Typography gutterBottom variant='caption' component='div'>
            City: {city}
          </Typography>
          <Typography gutterBottom variant='caption' component='div'>
            Country: {country}
          </Typography>
          <Typography gutterBottom variant='caption' component='div'>
            webSite: {website}
          </Typography>

        </CardContent>
        <CardActions>
          <LikeProfile profiles={profile} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Typography variant="subtitle1">
            Views: {views}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProfilesCard
