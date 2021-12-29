import { useEffect, useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { supabase } from '../utils/sup'
import { Avatar } from '@mui/material'

type AvatarProps = {
  url: string
  onUpload: Function
}

function UserAvatar({ url }: { url: string | null }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('images')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  return avatarUrl ? (
    <Avatar src={avatarUrl} alt='Avatar' sx={{ width: 56, height: 56 }} />
  ) : (
    <div className='avatar no-image' />
  )
}

export default UserAvatar
