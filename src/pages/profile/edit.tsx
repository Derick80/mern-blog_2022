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

const EditProfile: React.FC = () => {
  const [nickname, setNickname] =useState<string | null>(null)
  const [country, setCountry] =useState<string | null>(null)
  const [city, setCity] =useState<string | null>(null)
  const [bio, setBio] =useState<string | null>(null)
const [website,setWebsite] =useState<string | null>(null)
const [id,setId] =useState<number | null>(null)
const [avatar_url, setAvatarUrl] =useState<string | null>(null)
const [uploading, setUploading] = useState<boolean>(false)



const [session] = useSession()



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

    let { error: updateError } = await supabase.from('profiles').upsert({
      id: user,
      avatar_url: filePath,
    })

    if (updateError) {
      throw updateError
    }

    setAvatarUrl(null)
    setAvatarUrl(filePath)
  } catch (error) {
    console.log("this isn't working", error);
    
  } finally {
    setUploading(false)
  }
}

const getProfile = async ()=>{

const response = await fetch('http://localhost:8077/api/profile', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
   
  })
const data = await response.json()
const {profile} = data
setProfile(data)
return profile

}

const {data:profile, status, error} = useQuery('profile', getProfile)

 function setProfile(profile: Profile) {
     setId(profile.id)
    setAvatarUrl(profile.avatar_url)
  setNickname(profile.nickname)
  setCountry(profile.country)
  setCity(profile.city)
  setBio(profile.bio)
  setWebsite(profile.website)
}



  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { nickname, country, city, bio, website, avatar_url, id }
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
        <input className="visability hidden "
         onChange={(e) => setId(e.target.value)}
            type='number'
          value={profile.id }
        />
        <textarea
          cols={50}
          onChange={(e) => setBio(e.target.value)}
          placeholder='Bio'
          rows={8}
          defaultValue={profile.bio || ''}
        /><input
          autoFocus
          onChange={(e) => setNickname(e.target.value)}
          placeholder='Nickname'
          type='text'
          defaultValue={profile.nickname || ''}
        />
        <input
          autoFocus
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Country'
          type='text'
          defaultValue={profile.country || ''}
        />
        <input
          autoFocus
          onChange={(e) => setCity(e.target.value)}
          placeholder='City'
          type='text'
          defaultValue={profile.city || ''}
        />
       
        <input
          
          onChange={(e) => setWebsite(e.target.value)}
          placeholder='Website url'
         type="text"
         defaultValue={profile.website || ''}
        />
        <input className="visibility hidden"
          autoFocus
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder='avatar url'
          type='text'
          value={profile.avatar_url}
        />
        <label htmlFor="avatar">Avatar image</label>
        <div className="avatarField">
          <div className="avatarContainer">
            {profile.avatar_url ? (
              <Avatar url={profile.avatar_url}  />
            ) : (
              <div className="avatarPlaceholder">?</div>
            )}
          </div>
          <UploadButton onUpload={uploadAvatar} loading={uploading} />
        </div>
        <div>
        
      </div>
        <button className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
          disabled={!nickname || !country || !city || !bio}
          type='submit'
          
        >Save to update... </button>
      
        <a className='back' href='#' onClick={() => Router.push('/')}>
                 or Cancel
        </a>
      </form>
    </div>
  )
}

export default EditProfile
