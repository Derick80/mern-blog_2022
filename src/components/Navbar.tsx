/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
function Navbar() {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname
  const [session, loading] = useSession()

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <nav className='navbar'>
        <div className='nav-links'>
          <Link href='/'>
            <a className='a'>Home</a>
          </Link>
        </div>
        <p className={`nojs-show ${!session && loading}`}>
          {!session && (
            <>
              <span>You are not signed in</span>
              <a
                className='a'
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              <Link href='/profile/create'>
                <a data-active={isActive('/profile/create')}>
                  Create a Profile
                </a>
              </Link>
              <Link href='/profile'>
                <a data-active={isActive('/profile')}>Profile</a>
              </Link>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                />
              )}
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                className='a'
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </nav>
    </header>
  )
}

export default Navbar
