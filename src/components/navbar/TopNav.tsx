import { Button, Navbar, NavbarBrand, NavbarContent } from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import { GiMatchTip } from 'react-icons/gi'
import NavLink from './NavLink'
import UserMenu from './UserMenu'
import { auth } from '@/auth'
import { getUserInfoForNav } from '@/app/actions/userAction'

export default async function TopNav() {
  
  const session = await auth();
  const userInfo = session?.user && await getUserInfoForNav()
  return (
    <Navbar maxWidth='xl' className='bg-gradient-to-r from-purple-400 to-purple-700' classNames={{item:[
        'text-xl', 'text-white', 'uppercase'
    ]}}>
        <NavbarBrand as={Link} href={'/'}>
            <GiMatchTip size={40 } className='text-gray-200'/>
            <div className='font-bold text-3xl flex'><span className='text-gray-900'>Next</span>
            <span className='text-gray-200'>Match</span></div>
        </NavbarBrand>
        <NavbarContent justify='center'>
<NavLink href={'/members'} label= {'Matches'} />
<NavLink href={'/lists'} label= {'Lists'} />
<NavLink href={'/messages'} label= {'Messages'} />
        </NavbarContent>
        <NavbarContent justify='end'>
          {userInfo? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <>
             <Button variant='bordered' className='text-white' as={Link} href={'/auth/login'}>Login</Button>
             <Button variant='bordered' className='text-white' as={Link} href={'/auth/register'}>Register</Button>
            </>
          )}
        </NavbarContent>
    </Navbar>
  )
}
