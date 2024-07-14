'use client'

import css from './Header.module.css'
import Link from 'next/link'
import '../globals.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navbar= () => {
   const pathname = usePathname()
  return (
    <header className='header'>
      <div className= {css.flexNavbar}> 
        <div><Image alt='логотип' width={50} height={50} src='/logo.png'></Image></div>
        <div><Link className={`${pathname === '/' ? 'active' : ''}`} href='/' >Главная</Link>
        <Link className={`${pathname == '/posts' ? 'active' : ''}`} href='/posts'>Посты</Link>
        <Link className={`${pathname == '/users' ? 'active' : ''}`} href='/users'>Пользователи</Link>
       </div></div>
    </header>
  )
}

export default Navbar