import { getSession, session } from 'next-auth/client'
import { ChangeEvent, useState } from 'react'
import { DEFAULT_AVATARS_BUCKET } from '../utils/constants'
import { supabase } from '../utils/sup'
import Avatar from './Avatar'
import UploadButton from './uploadButton'

import { useQuery } from 'react-query'


export default function Account() {
  const [loading, setLoading] = useState<boolean>(true)
  const [uploading, setUploading] = useState<boolean>(false)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)
  const [id, setId] = useState<number>(0)




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
      setAvatarUrl(null)
      setAvatarUrl(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }


  function setProfile(profile: UserProfile) {
    setId(profile?.id)
    setAvatarUrl(profile?.avatar_url)
    setNickname(profile?.nickname)
    setCountry(profile?.country)
    setCity(profile?.city)
    setBio(profile?.bio)
    setWebsite(profile?.website)
  }



  async function getProfile() {

    try {
      setLoading(true)
      const response = await fetch('http://localhost:8077/api/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

      })
      const data = await response.json()
      setProfile(data)
    }
    catch (error) {
      console.log('error', error.message)

    } finally {
      setLoading(true)
    }


  }


  const { data: profile, status, error } = useQuery('profile', getProfile)



  async function updateProfile() {
    try {
      setLoading(true)
      const body = { nickname, country, city, bio, avatar_url, website }
      await fetch('http://localhost:8077/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="account">
      <div>
        <label htmlFor="avatar">Avatar image</label>
        <div className="avatarField">
          <div className="avatarContainer">
            {avatar ? (
              <Avatar url={avatar} size={35} />
            ) : (
              <div className="avatarPlaceholder">?</div>
            )}
          </div>
          <UploadButton onUpload={uploadAvatar} loading={uploading} />
        </div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button className="button block primary" onClick={() => updateProfile()} disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}