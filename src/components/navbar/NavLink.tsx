
"use client"
import { NavbarItem } from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

type Props= {
    href: string;
    label: string;
}
export default function NavLink({href, label} :Props) {
    const pathname = usePathname ();
    const isActive = pathname === href
  return (
    <NavbarItem 
            as={Link} 
            href={href} 
            className={`text-xl text-white uppercase ${isActive ? 'text-yellow-200' : ''}`} // Apply the active class
        >{label}</NavbarItem>
  )
}
