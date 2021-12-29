import React, { useState } from 'react'
import UploadButton from '../../../components/uploadButton'
import { createPost } from '../../../hooks'

export default function Draft() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [postImage, setPostImage] = useState('')
  const [upLoading, setUpLoading] = useState()
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      createPost(title, content, postImage)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className='post_form'

      onSubmit={onSubmit}
    >
      <div className='form_body'>
        <label>Post Title</label>
        <input type='text'

          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Post Content</label>
        <input type='text'

          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </div>
      <button type='submit'>Submit</button>

      <UploadButton />
    </form>
  )
}
