import React, { useState, ChangeEvent } from 'react'
import Router from 'next/router'
import { useSession, getSession } from 'next-auth/client'
import { createUserProfile, updateUserProfile } from '../hooks'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import Link from './Link'




const ProfileForm = ({ nickname,
    country,
    city,
    bio,
    avatar_url,
    website,
    id, }: UserProfile) => {
    const [nickname, setNickname] = useState<string>({ nickname })
    const [country, setCountry] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const [website, setWebsite] = useState<string>('')
    const [avatar_url, setAvatarUrl] = useState<string>('')
    const [uploading, setUploading] = useState<boolean>(false)

    const submitBrandNewProfileData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        createUserProfile(nickname, country, city, bio, website, avatar_url)
    }

    const SubmitEditedProfileData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        updateUserProfile(id, nicknames, countrys, citys, bios, websites)

    };

    return (<Box
        component='form'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
        onSubmit={submitData}
    >
        <Typography variant='h3'>Create Your Profile</Typography>

        <TextField
            required
            id='outlined-required'
            onChange={(e) => setBio(e.target.value)}
            placeholder='Bio'
            label='Bio'
            value={bio}
        />
        <TextField
            autoFocus
            onChange={(e) => setNickname(e.target.value)}
            placeholder='Nickname'
            type='text'
            value={nickname}
        />
        <TextField
            autoFocus
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
            type='text'
            value={country}
        />
        <TextField
            autoFocus
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
            type='text'
            value={city}
        />

        <TextField
            onChange={(e) => setWebsite(e.target.value)}
            placeholder='Website url'
            type='text'
            value={website}
        />

        <Box>
            <Typography variant='h6'>Avatar image</Typography>
            <UploadButton onUpload={uploadAvatar} loading={uploading} />
        </Box>

        <Button disabled={!nickname || !country || !city || !bio} type='submit'>
            Create{' '}
        </Button>
        <Button
            variant="contained"
            component={Link}
            noLinkStyle
            href="/profiles"
        >
            or Cancel{" "}
        </Button>
        <a href='#' onClick={() => Router.push('/profile')}>
            or Cancel
        </a>
    </Box>)
}

export default ProfileForm