import { session, signOut, useSession } from 'next-auth/client'
import * as React from 'react'
import Link from 'next/link'

export default function Navigation() {
    const [session, loading] = useSession()
    if (!session) {
        return (
            <nav>
                <ul className='nav_links'>
                    <li>
                        <Link href='/'>
                            <a>Feed</a>
                        </Link>
                    </li>

                    <li>
                        <Link href='/api/auth/signin'>
                            <a>SignIn</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    } else
        return (
            <nav>
                <ul className='nav_links'>
                    <li>
                        <Link href='/'>
                            <a>Feed</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/post/create'>
                            <a>Create post</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/post/drafts'>
                            <a>See Drafts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/profiles'>
                            <a>Look at all Profiles</a>
                        </Link>
                    </li>
                </ul>
                <ul className='nav_links_nav_right'>
                    <li>
                        <Link href='/profile'>
                            <a>My Profile</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/profile'>
                            <a>LogOut</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
}
