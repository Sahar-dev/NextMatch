'use client';
import { signOutUser } from '@/app/actions/authActions';

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@heroui/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
type Props = {
    userInfo: {name: string | null; image: string |null;} | null
}

export default function UserMenu({userInfo}: Props) {
  return (
    <Dropdown placement='bottom-end'>
        <DropdownTrigger>
            <Avatar isBordered  as='button' className='transition-transform' color='secondary' name={userInfo?.name ||'user avatar' }
            size='sm' src={userInfo?.image || 'images/user.png'} />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User actions menu'>
            <DropdownSection showDivider>
                <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username' key={'1'}>
                 Signed in as  {userInfo?.name}
                </DropdownItem>
            </DropdownSection>
            <DropdownItem as={Link} href='/members/edit' key={'2'} >
                 Edit profile
                </DropdownItem>
                <DropdownItem color='danger' onPress={async () => signOutUser()} key={'3'}>
                 Logout
                </DropdownItem> 
        </DropdownMenu>
    </Dropdown>
  )
}
