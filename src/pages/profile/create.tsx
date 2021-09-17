import React, { useState, ChangeEvent } from 'react'
import UploadButton from '../../components/uploadButton'
import Router from 'next/router'
import { useSession, getSession } from 'next-auth/client'
import { supabase } from '../../utils/sup'
import { DEFAULT_AVATARS_BUCKET } from '../../utils/constants'


const CreateProfile: React.FC = () => {

  const [nickname, setNickname] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [avatar_url, setAvatarUrl] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { nickname, country, city, bio, website, avatar_url }
      await fetch('http://localhost:8077/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

    } catch (error) {
      console.error(error)
    }
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }
      const session = await getSession()
      const user = session?.user_id
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${session?.user_id}${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      setAvatarUrl(filePath)
    } catch (error) {
      console.log("this isn't working", error);

    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <form onSubmit={submitData}>
        <div  >Create Your Profile</div >

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
        
        <label htmlFor="avatar">Avatar image</label>
        <div >

          <UploadButton onUpload={uploadAvatar} loading={uploading} />
        </div>

        <button 
          disabled={!nickname || !country || !city || !bio}
          type='submit'

        >Create </button>

        <a  href='#' onClick={() => Router.push('/profile')}>
          or Cancel
        </a>
      </form>
    </div>
  )
}

export default CreateProfile
