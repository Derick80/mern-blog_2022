import React, { useState } from 'react'
import Router from 'next/router'
import {SubmitHandler, useForm} from 'react-hook-form'

const Draft: React.FC = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onSubmit = async (e:React.SyntheticEvent) => {
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
 
      <div   onSubmit={onSubmit}>
        <div>
        <label >Blog Title</label> 
        <input 
       autoFocus
       onChange={(e)=>setTitle(e.target.value)}
       placeholder="Set a"
       type="text"
       value={title}
        />


      <label >Content</label>
      <textarea rows={5} cols={5} placeholder="Write Something down" 
      autoFocus
       onChange={(e)=>setContent(e.target.value)}
       value={content}
       />
  
       </div>
      
        <button   disabled={!content || !title} type='submit'>
    Submit
   </button>
      </div >
  
  )
}

export default Draft
