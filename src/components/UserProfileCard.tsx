import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import { useState } from "react";
import UserAvatar from "../components/Avatar";
import EditProfile from "../pages/profile/edit";



const ProfileCard = ({ profile }: DeProfile) => {
  const {
    nickname,
    country,
    city,
    bio,
    avatar_url,
    website,

    updatedAt,
  } = profile;
  const [edit, setEdit] = useState(false);

  const handleEditClick = (e: React.SyntheticEvent) => {
    return setEdit(true);
  };

  const lastUpdated = updatedAt ? new Date() : null;

  if (edit === false) {
    return (
      <>
        <Card sx={{ maxWidth: 345 }} >
          <Avatar>
            <UserAvatar url={avatar_url} />      </Avatar>
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
    <Box>
      <EditProfile {...profile} />
    </Box>
  );
};

export default ProfileCard;
