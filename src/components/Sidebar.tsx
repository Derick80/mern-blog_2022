import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useSession } from 'next-auth/client';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';



const Sidebar = () => {
  const [session] = useSession()

  return (
    <Grid item xs={12} md={4}>

      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom >
          Oh haiyo
        </Typography>
      </Paper>
    </Grid>

  )
}

export default Sidebar
