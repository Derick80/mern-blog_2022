import { getSession } from 'next-auth/client'
import React, { useState, ChangeEvent } from 'react'
import UploadButton from '../../../components/uploadButton'
import { createPost } from '../../../hooks'
import { DEFAULT_POST_IMAGE_BUCKET } from '../../../utils/constants'
import { supabase } from '../../../utils/sup'

export default function Draft() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [postImage, setPostImageUrl] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)


  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      createPost(title, content, postImage)
    } catch (error) {
      console.error(error)
    }
  }
  async function uploadPostImage(event: ChangeEvent<HTMLInputElement>) {
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
  return (
    < >

      <form className='post_form_container' onSubmit={onSubmit}>
        <h5>Create a new Blog Post</h5>
        <label>Blog Post Title:</label>
        <input type='text'
          required
          placeholder="Post Title"
          autoFocus={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Contents:</label>
        <textarea
          placeholder="Write your post here"
          required
          cols="100"
          rows='10'
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>



        <UploadButton onUpload={uploadPostImage} loading={uploading} />
        <button type='submit'>Continue</button>
      </form>
    </>
  )
}
