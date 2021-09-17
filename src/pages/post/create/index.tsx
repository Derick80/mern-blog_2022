import React, { useState } from 'react'
import Router from 'next/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Draft() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
  
    const onSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault()
      try {
        const body = { title, content }
        await fetch(`http://localhost:8077/api/post`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        await Router.push('/post/drafts')
      } catch (error) {
        console.error(error)
      }
    }
  

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
   >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <TextField
       
          id="outlined-disabled"
         
          onChange={(e)=>setContent(e.target.value)}
       value={content}
        />
      </div>
      <Button type="submit"
>
  Submit
</Button>
    </Box>
  );
}
