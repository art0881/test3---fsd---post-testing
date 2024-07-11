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
        <Link className={`${pathname == '/users' ? 'active' : ''}`} href='/users' >Пользователи</Link>
        <Link className={`${pathname == '/usersPage' ? 'active' : ''}`} href='/usersPage'>Данные</Link>
        <Link className={`${pathname == '/usersQuery' ? 'active' : ''}`} href='/usersQuery'>user Query</Link>
        <Link className={`${pathname == '/usersProps' ? 'active' : ''}`} href='/usersProps'>user Props</Link>
        {/* <Link className={`${pathname == '/exserver' ? 'active' : ''}`} href='/exserver'>ex server</Link> */}
        </div></div>
    </header>
  )
}

export default Navbar