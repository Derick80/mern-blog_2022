import React, {useState, ChangeEvent}from 'react'
import { useSession, getSession } from 'next-auth/client'
import {useQuery } from 'react-query'
import Image from 'next/image'
import Avatar from '../../components/Avatar'
// import {useProfile, getProfile} from '../../hooks'
import {supabase} from '../../utils/sup'
import ProfileCard from '../../components/ProfileCard'
import UploadButton from '../../components/uploadButton'
import Router from 'next/router'
import { DEFAULT_AVATARS_BUCKET } from '../../utils/constants'


type ProfileEditProps={
  profile: Profile
}

const EditProfile= ({ nickname, country, city, bio, avatar_url, website, id, userId, updatedAt}: Profile)=> {
  const [nicknames, setNickname] =useState<string | null>(null)
  const [countrys, setCountry] =useState<string | null>(null)
  const [citys, setCity] =useState<string | null>(null)
  const [bios, setBio] =useState<string | null>(null)
const [websites,setWebsite] =useState<string | null>(null)
const [ids,setId] =useState<number |any >(null)

const [uploading, setUploading] = useState<boolean>(false)



const [session] = useSession()





  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
     
      const body = { nicknames, countrys, citys, bios, websites,  id }
      console.log(body);
      
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
    <div>
      <form  className="w-full max-w-lg m-auto py-10 mt-10 px-10 border" onSubmit={submitData} >
        <div className="text-gray-600 font-medium" >Create Your Profile</div >
                <textarea
          cols={50}
          onChange={(e) => setBio(e.target.value)}
          placeholder='Bio'
          rows={8}
          defaultValue={bio || ''}
        /><input
          autoFocus
          onChange={(e) => setNickname(e.target.value)}
          placeholder='Nickname'
          type='text'
          defaultValue={nickname || ''}
        />
        <input
          autoFocus
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Country'
          type='text'
          defaultValue={country || ''}
        />
        <input
          autoFocus
          onChange={(e) => setCity(e.target.value)}
          placeholder='City'
          type='text'
          defaultValue={city || ''}
        />
       
        <input
          
          onChange={(e) => setWebsite(e.target.value)}
          placeholder='Website url'
         type="text"
         defaultValue={website || ''}
        />
       
        <label htmlFor="avatar">Avatar image</label>
        <div className="avatarField">
          <div className="avatarContainer">
            {avatar_url ? (
              <Avatar   />
            ) : (
              <div className="avatarPlaceholder">?</div>
            )}
          </div>
        
        </div>
        <div>
        
      </div>
        <button className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
          disabled={!nicknames || !countrys || !citys || !bios}
          type='submit'
          onClick={() => Router.push('/profile')}
        >Save to update... </button>
      
        <a className='back' href='#' onClick={() => Router.push('/')}>
                 or Cancel
        </a>
      </form>
    </div>
  )
}

export default EditProfile
