import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import Router from 'next/router'

const Draft: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content }
      await fetch(`http://localhost:8077/api/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/post/drafts')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={submitData}>
        <h3>New Draft</h3>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          type='text'
          value={title}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
          rows={8}
          value={content}
        />
        <input disabled={!content || !title} type='submit' value='Create' />
        <a className='back' href='#' onClick={() => Router.push('/')}>
          or Cancel
        </a>
      </form>
    </div>
  )
}

export default Draft
