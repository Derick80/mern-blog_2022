import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useSession } from 'next-auth/client';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';



const Sidebar = () => {
  const [session] = useSession()

  return (
    <div className="side_bar">


    </div>

  )
}

export default Sidebar
