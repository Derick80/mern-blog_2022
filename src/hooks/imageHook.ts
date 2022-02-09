import { getSession } from 'next-auth/client'
import { ChangeEvent } from 'react'
import { DEFAULT_POST_IMAGE_BUCKET } from '../utils/constants'
import { supabase } from '../utils/sup'

type UpLoadPostImageProps = {
  setUploading: boolean
  setPostImageUrl: string
}

export default async function uploadPostImage(
  { setUploading: boolean, setPostImageUrl: string }: UpLoadPostImageProps,
  event: ChangeEvent<HTMLInputElement>
) {
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
      .from(DEFAULT_POST_IMAGE_BUCKET)
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    setPostImageUrl(filePath)
  } catch (error) {
    console.log("this isn't working", error)
  } finally {
    setUploading(false)
  }
}
