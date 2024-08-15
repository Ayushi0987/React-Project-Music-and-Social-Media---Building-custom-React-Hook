import React, { useEffect, useState } from 'react'
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import css from '@/styles/Navbar.module.css'
import { useRouter } from 'next/router';
import useDebounce from '@/Hooks/useDebounce';

export default function NavBar() {
    const {token, name} = useAuth();
    const router = useRouter();
    const musicQuery = router.query.music;

    const isRoot = router.pathname === '/';

    const [musicSearch, setMusicSearch] = useState(musicQuery);

    const musicQuerySearch = useDebounce(musicSearch, 1000);

    function handleSearch(){
        setMusicSearch(musicQuerySearch);
    }

    useEffect(()=>{
        console.log('called')
        router.push({
            pathname: '/',
            query: {music: musicQuerySearch} 
        })
    },[musicQuerySearch])

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
            {isRoot && 
                <div className={css.searchPanel}>
                    <input type='text' placeholder='Search here' value={musicSearch} onChange={(e)=>handleSearch(e.target.value)} />
                </div>
            }
            <div className='login-btn'>
                {!token && <Link href='/login'><button type='button'>Login</button></Link>}
                {token && <span>{name}</span>}
            </div>
    </div> 
  )
}
