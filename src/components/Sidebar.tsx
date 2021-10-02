import Paper from "@mui/material/Paper"
import { Grid } from "@mui/material"
import UserProfileCard from '../components/UserProfileCard'
import { useSession } from "next-auth/client";
import { useQuery } from "react-query";

export const Sidebar: React.FC = () => {

  const [session] = useSession();

  const getProfile = async (props: any) => {
    const response = await fetch("http://localhost:8077/api/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const { profile } = data;
    return profile;
  };

  const { data: profile, status, error } = useQuery("profile", getProfile);
  // const { nickname, country, city, bio, avatar_url, website, id, userId, updatedAt}=profile
  console.log("profile", profile);
  if (status === "loading") {
    return <div>profile is loading</div>;
  } else if (status === "success" && profile) {
    return (
      <Grid item xs={12} md={4} >

        <Paper elevation={0} sx={{ p: 2, bgcolor: `primary.light` }}>
          {/* <UserProfileCard {...profile} /> */}

        </Paper>


      </Grid >
    )
  } else {
    return <div> nothing to see here</div>
  }
}

export default Sidebar
