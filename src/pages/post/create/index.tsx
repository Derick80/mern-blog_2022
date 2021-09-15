import React, { useState } from 'react'
import Router from 'next/router'
import {SubmitHandler, useForm} from 'react-hook-form'

const Draft: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PostFormInput>();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onSubmit:SubmitHandler<PostFormInput>= async (data) => {
  
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
 
      <form className="w-full max-w-lg m-auto py-10 mt-10 px-10 border" onSubmit={handleSubmit(onSubmit)}>
        <div>
        <label className="text-gray-600 font-medium">Blog Title</label> 
        <input className="border-solid border-gray-300 border  w-full
    rounded text-gray-700 pr-20"  autoFocus {...register("title", { required: "Please Enter a title", })}  placeholder="Set a title for your post" />

{errors.title && (
  <div className="mb-3 text-normal text-red-500 ">{errors.title}</div>
  )}

      <label className="text-gray-600 font-medium block mt-4">Content</label>
      <textarea className="border-solid border-gray-300 border pr-20 py-1 w-full
  rounded text-gray-700" rows={5} cols={5} placeholder="Write Something down" autoFocus {...register("content",{ required:true })} />
  
       </div>
        <button
    className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
    type="submit"
  >
    Submit
  </button>
      </form>
  
  )
}

export default Draft
