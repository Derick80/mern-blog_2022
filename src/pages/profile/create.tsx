import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Router from 'next/router'

const CreateProfile: React.FC = () => {
  const [nickname, setNickname] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [bio, setBio] = useState('')
const [website,setWebsite] = useState('')
const [avatar_url, setAvatarUrl] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { nickname, country, city, bio, website, avatar_url}
      await fetch('http://localhost:8077/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form  className="w-full max-w-lg m-auto py-10 mt-10 px-10 border" onSubmit={submitData}>
        <div className="text-gray-600 font-medium" >Create Your Profile</div >
        
        <textarea
          cols={50}
          onChange={(e) => setBio(e.target.value)}
          placeholder='Bio'
          rows={8}
          value={bio}
        /><input
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
       
        <input
          
          onChange={(e) => setWebsite(e.target.value)}
          placeholder='Website url'
         type="text"
          value={website}
        />
<input
          autoFocus
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder='avatar url'
          type='text'
          value={avatar_url}
        />
        <button className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
          disabled={!nickname || !country || !city || !bio}
          type='submit'
          
        >Create </button>
      
        <a className='back' href='#' onClick={() => Router.push('/')}>
                 or Cancel
        </a>
      </form>
    </div>
  )
}

export default CreateProfile
