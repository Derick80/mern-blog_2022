import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { deletePost, editPost } from '../hooks'


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

type Props = {
    id: number
};

const PostUsersCard = ({ id }: Props) => {


    return (
        <Box>
            {''}<Button variant="contained" color="primary" onClick={() => editPost(id)}>Edit</Button>

            <Button variant="contained" color="primary" onClick={() => deletePost(id)}>Delete</Button>


        </Box>)
}


export default PostUsersCard