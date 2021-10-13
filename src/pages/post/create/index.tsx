import React, { useState } from 'react'
import Router from 'next/router'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Toolbar from '../../../components/editor/Toolbar'
import { createPost } from '../../../hooks'

export default function Draft() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      createPost(title, content)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
      onSubmit={onSubmit}
    >
      <Box>
        <TextField
          required
          id='outlined-required'
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id='outlined-disabled'
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </Box>
      <Button type='submit'>Submit</Button>
    </Box>
  )
}
