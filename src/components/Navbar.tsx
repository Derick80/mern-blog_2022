import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'

const Navbar: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const [session, loading] = useSession()

  let left = (
    <div className='m-auto  left-1'>
      <Link href='/'>
        <a data-active={isActive('/')}>Feed</a>
      </Link>
    </div>
  )

  let right = null

  if (loading) {
    left = (
      <div className='m-auto  left-1'>
        <Link href='/'>
          <a data-active={isActive('/')}>Main Feed</a>
        </Link>
      </div>
    )
    right = (
      <div className='m-auto right-1 ' >
        <p>Validating session ...</p>
      </div>
    )
  }

  if (!session) {
    right = (
      <div className='m-auto  right-1' >
        <Link href='/api/auth/signin'>
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    )
  }

  if (session) {
    left = (
      <div className='mr-8 place-content-around flex justify-start items-center font-bold space-x-5 ' >
        <Link href='/'>
          <a data-active={isActive('/')}>Feed</a>
        </Link>
        <Link href='/post/create' passHref>
          <a data-active={isActive('/')}>New Post</a>
        </Link>
        <Link href='/post/drafts'>
          <a data-active={isActive('/post/drafts')}>My drafts</a>
        </Link>
        <Link href='/profile'>
          <a data-active={isActive('/profile')}>Profile</a>
        </Link>
      </div>
    )
    right = (
      <div className='ml-auto place-content-around flex justify-end items-center font-bold space-x-5 '>
        {session.user.image && (
          <Image
            className='navbar-image'
            src={session.user.image}
            alt='myimage'
            width='80'
            height='80'
          />
        )}

        <div>
          {session.user.name} ({session.user.email})
        </div>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    )
  }

  return (
    <nav className='m-auto w-full inline-flex broder outline-black '>
      {left}
      {right}
    </nav>
  )
}

export default Navbar
