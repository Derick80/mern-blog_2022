import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Router from 'next/router'

const Draft: React.FC = () => {
  const [nickname, setNickname] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [bio, setBio] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { nickname, country, city, bio }
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>create profile</h1>
          <input
            autoFocus
            onChange={(e) => setNickname(e.target.value)}
            placeholder='Nickname'
            type='text'
            value={nickname}
          />
          <input
            autoFocus
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
            type='text'
            value={country}
          />
          <input
            autoFocus
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
            type='text'
            value={city}
          />
          <textarea
            cols={50}
            onChange={(e) => setBio(e.target.value)}
            placeholder='Bio'
            rows={8}
            value={bio}
          />
          <input
            disabled={!nickname || !country || !city || !bio}
            type='submit'
            value='Create'
          />
          <a className='back' href='#' onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Draft
