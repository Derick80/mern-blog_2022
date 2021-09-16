import { useState, useEffect, ChangeEvent } from 'react'
import { supabase } from '../utils/sup'
import UploadButton from '../components/uploadButton'
import Avatar from '../components/Avatar'
import { useSession, getSession } from 'next-auth/client'
import { DEFAULT_AVATARS_BUCKET } from '../utils/constants'



export default function Account() {
  const [loading, setLoading] = useState<boolean>(true)
  const [uploading, setUploading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)

   



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
      const fileName = `${session?.user.id}${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      let { error: updateError } = await supabase.from('profiles').upsert({
        id: user!.id,
        avatar_url: filePath,
      })

      if (updateError) {
        throw updateError
      }

      setAvatar(null)
      setAvatar(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  function setProfile(profile: Profile) {
    setAvatar(profile.avatar_url)
  setNickname(profile.nickname)
  setCountry(profile.country)
  setCity(profile.city)
  setBio(profile.bio)
  setWebsite(profile.website)
  }

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user!.id)
        .single()

      if (error) {
        throw error
      }

      setProfile(data)
    } catch (error) {
      console.log('error', error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user!.id,
        username,
        website,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
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