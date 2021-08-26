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
    <div className='nav_left'>
      <Link href='/'>
        <a data-active={isActive('/')}>Feed</a>
      </Link>
    </div>
  )

  let right = null

  if (loading) {
    left = (
      <div className='nav_left'>
        <Link href='/'>
          <a data-active={isActive('/')}>Main Feed</a>
        </Link>
      </div>
    )
    right = (
      <div className='nav_right'>
        <p>Validating session ...</p>
      </div>
    )
  }

  if (!session) {
    right = (
      <div className='nav_right'>
        <Link href='/api/auth/signin'>
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    )
  }

  if (session) {
    left = (
      <div className='nav_left'>
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
      <div className='nav_right'>
        {session.user.image && (
          <Image
            className='navbar-image'
            src={session.user.image}
            alt='myimage'
            width='80'
            height='80'
          />
        )}

        <p>
          {session.user.name} ({session.user.email})
        </p>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    )
  }

  return (
    <nav className='navbar'>
      {left}
      {right}
    </nav>
  )
}

export default Navbar
