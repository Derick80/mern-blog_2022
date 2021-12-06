import { Box, Button, TextField } from '@mui/material'
import { updateUserProfile } from '../../hooks'
import Router from 'next/router'
import React, { useState } from 'react'
import Avatar from '../../components/UserAvatar'
import { Typography } from '@mui/material'
import UploadButton from '../../components/uploadButton'

const EditProfile = ({
  nickname,
  country,
  city,
  bio,
  avatar_url,
  website,
  id,
  likes,
}: UserProfile) => {
  const [nicknames, setNickname] = useState<string>('')
  const [countrys, setCountry] = useState<string>('')
  const [citys, setCity] = useState<string>('')
  const [bios, setBio] = useState<string>('')
  const [websites, setWebsite] = useState<string>('')

  //I guess I have to input the props in order inwhich they were defined in the updateUserProfile function. Meaning the ID number had to go before the nicknames string.  ALthough once I'm destructuring in the function order doesn't matter.
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    updateUserProfile(id, nicknames, countrys, citys, bios, websites)
    try {
      const body = { nicknames, countrys, citys, bios, websites, id }
      console.log(body)

      await fetch('http://localhost:8077/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
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
      onSubmit={submitData}
    >
      <Typography variant='h3'>Update Your Profile</Typography>
      <TextField
        onChange={(e) => setBio(e.target.value)}
        placeholder='Bio'
        rows={8}
        defaultValue={bio || ''}
      />
      <TextField
        autoFocus
        onChange={(e) => setNickname(e.target.value)}
        placeholder='Nickname'
        type='text'
        defaultValue={nickname}
      />
      <TextField
        autoFocus
        onChange={(e) => setCountry(e.target.value)}
        placeholder='Country'
        type='text'
        defaultValue={country || ''}
      />
      <TextField
        autoFocus
        onChange={(e) => setCity(e.target.value)}
        placeholder='City'
        type='text'
        defaultValue={city || ''}
      />

      <TextField
        onChange={(e) => setWebsite(e.target.value)}
        placeholder='Website url'
        type='text'
        defaultValue={website || ''}
      />

      <label htmlFor='avatar'>Avatar image</label>
      <div className='avatarField'>
        <div className='avatarContainer'>
          {avatar_url ? (
            <Avatar url={avatar_url} />
          ) : (
            <div className='avatarPlaceholder'>?</div>
          )}
        </div>
        <UploadButton onUpload={uploadAvatar} loading={uploading} />
      </div>
      <div></div>
      <Button
        disabled={!nicknames || !countrys || !citys || !bios}
        type='submit'
        onClick={() => Router.push('/profile')}
      >
        Save to update...{' '}
      </Button>

      <a href='#' onClick={() => Router.push('/')}>
        or Cancel
      </a>
    </Box>
  )
}

export default EditProfile
