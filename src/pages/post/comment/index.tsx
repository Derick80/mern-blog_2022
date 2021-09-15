import React, { useState } from 'react'
import Router from 'next/router'

const Comment: React.FC = () => {
  const [content, setContent] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { content }
      await fetch(`http://localhost:8077/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='create-comment'>
      <form onSubmit={submitData}>
        <textarea className='border border-separate m-auto w-full h-24'
          onChange={(e) => setContent(e.target.value)}
          placeholder='Leave a comment'
          rows={2}
          value={content}
        />
        <input disabled={!content} type='submit' value='Post a comment...' />
      </form>
    </div>
  )
}

export default Comment
