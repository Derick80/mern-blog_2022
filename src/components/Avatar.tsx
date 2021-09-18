import { useEffect, useState, ChangeEvent } from 'react'
import Image from'next/image'
import { supabase } from '../utils/sup'

type AvatarProps ={
  url:string,
  onUpload: Function
  uploadAvatar: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
}

function UserAvatar({ url }: {url:string | null}) {
  const [avatarUrl, setAvatarUrl]  =useState<string | null>(null)


  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('images').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }



  return (
      avatarUrl ? (
        
        <Image
          src={avatarUrl}
          alt="Avatar"
          width='80'
          height='80'
       
        />
      ) : (
        <div className="avatar no-image" />
      )
  )
}

export default UserAvatar