import React from 'react'
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import css from '@/styles/Navbar.module.css'

export default function NavBar() {
    const {token, name} = useAuth();
  return (
    <div className={`${css.navbar} flex ${css.container}`}>
        <div className='flex brandlogo'>Brand Logo</div>
            <nav className={css.nav}>
                <ul className={`${css.navLinks} flex`}>
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/social'}>Social</Link></li>
                    <li><Link href={'/library'}>Library</Link></li>
                </ul>
            </nav>
            <div className={css.searchPanel}>
                <input type='text' placeholder='Search here'></input>
            </div>
            <div className='login-btn'>
            {!token && <Link href='/login'><button type='button'>Login</button></Link>}
            {token && <span>{name}</span>}
            </div>
    </div>
  )
}
