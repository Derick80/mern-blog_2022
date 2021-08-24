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

  if (loading) {
    return (
      <div className='left'>
        <Link href='/'>
          <a className='bold' data-active={isActive('/')}>
            Main Feed
          </a>
        </Link>

        <div className='right'>
          <p>Validating session ...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className='right'>
        <Link href='/api/auth/signin'>
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    )
  }

  if (session) {
    return (
      <div className='left'>
        <Link href='/'>
          <a className='bold' data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href='/drafts'>
          <a data-active={isActive('/post/drafts')}>My drafts</a>
        </Link>

        <div className='right'>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt='myimage'
              width='100'
              height='100'
            />
          )}
          <p>
            {session.user.name} ({session.user.email})
          </p>
          <Link href='/post/create' passHref>
            <button>
              <a>New post</a>
            </button>
          </Link>
          <Link href='/profile'>
            <a data-active={isActive('/profile')}>Profile</a>
          </Link>
          <button onClick={() => signOut()}>
            <a>Log out</a>
          </button>
        </div>
      </div>
    )
  }
}

export default Navbar
