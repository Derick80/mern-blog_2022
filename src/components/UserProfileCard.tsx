import Image from "next/image";
import { useState } from "react";
import EditProfile from "../pages/profile/edit";
import UserAvatar from "../components/Avatar";
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


type Props = {
  profile: DeProfile;
};

const ProfileCard = ({ profile }: DeProfile) => {
  const {
    nickname,
    country,
    city,
    bio,
    avatar_url,
    website,
    id,
    userId,
    updatedAt,
  } = profile;
  const [edit, setEdit] = useState(false);
  // const pItems = profile.profile.map(item=> item)
  const handleEditClick = (e: React.SyntheticEvent) => {
    return setEdit(true);
  };

  const lastUpdated = updatedAt ? new Date() : null;
  console.log(
    nickname,
    country,
    city,
    bio,
    avatar_url,
    website,
    id,
    userId,
    updatedAt
  );

  if (edit === false) {
    return (
      <>
          <Card sx={{ maxWidth: 345 }} >
          <Avatar>
            <UserAvatar url={avatar_url}/>      </Avatar>
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
          <Typography gutterBottom variant="caption" component="div">
          Last updated{" "}
                {lastUpdated
                  ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
                  : "Never"}
          </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" type="submit" onClick={handleEditClick}>Edit</Button>
      
      </CardActions>   
           
           
        
        </Card>
      </>
    );
  } else {
  }
  return (
    <div>
      <EditProfile {...profile} />
    </div>
  );
};

export default ProfileCard;
