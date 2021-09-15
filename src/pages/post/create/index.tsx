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
 
      <form className="w-full max-w-lg m-auto py-10 mt-10 px-10 border" onSubmit={onSubmit}>
        <div>
        <label className="text-gray-600 font-medium">Blog Title</label> 
        <input className="border-solid border-gray-300 border py-2 px-4 w-full
       rounded text-gray-700" 
       autoFocus
       onChange={(e)=>setTitle(e.target.value)}
       placeholder="Set a"
       type="text"
       value={title}
        />


      <label className="text-gray-600 font-medium block mt-4">Content</label>
      <textarea className="border-solid border-gray-300 border py-20 px-4 w-full
      rounded text-gray-700" rows={5} cols={5} placeholder="Write Something down" 
      autoFocus
       onChange={(e)=>setContent(e.target.value)}
       value={content}
       />
  
       </div>
      
        <button className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"  disabled={!content || !title} type='submit'>
    Submit
   </button>
      </form>
  
  )
}

export default Draft
