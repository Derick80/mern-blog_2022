import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Router from 'next/router'

const CreateProfile: React.FC = () => {
  const [nickname, setNickname] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [bio, setBio] = useState('')
const [website,setWebsite] = useState('')
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { nickname, country, city, bio }
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>create profile</h1>
        <input
          autoFocus
          onChange={(e) => setNickname(e.target.value)}
          placeholder='Nickname'
          type='text'
          value={nickname}
        />
        <input
          autoFocus
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Country'
          type='text'
          value={country}
        />
        <input
          autoFocus
          onChange={(e) => setCity(e.target.value)}
          placeholder='City'
          type='text'
          value={city}
        />
        <textarea
          cols={50}
          onChange={(e) => setBio(e.target.value)}
          placeholder='Bio'
          rows={8}
          value={bio}
        />
        <textarea
          cols={50}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder='Website url'
          rows={8}
          value={website}
        />

        <input
          disabled={!nickname || !country || !city || !bio}
          type='submit'
          value='Create'
        />
        <a className='back' href='#' onClick={() => Router.push('/')}>
          or Cancel
        </a>
      </form>
    </div>
  )
}

export default CreateProfile
