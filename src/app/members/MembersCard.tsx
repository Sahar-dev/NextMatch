'use client'
import LikeButton from '@/components/LikeButton'
import { calculateAge, transformImageUrl } from '@/lib/util'
import { Card, CardFooter, Image } from '@heroui/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
    member: Member
    likeIds: string []
}
export default function MembersCard({member, likeIds}: Props ) {
    const preventLinkAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const hastLiked =likeIds.includes(member.userId);
  return (
    <Card fullWidth  as={Link} href={`/members/${member.userId}`} isPressable>
        <Image  
            isZoomed
            alt={member.name}
            width={500}
            src={transformImageUrl( member.image) || 'images/user.png'}
            className='aspect-square object-cover'
        
        />
        <div onClick={preventLinkAction}>
        <div className='absolute top-3 z-50'>
            <LikeButton targetId={member.userId} hasLiked={hastLiked} />
        </div>
        </div>
        
        <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient'>
            <div className='flex flex-col text-white'>
                <span className='font-semibold'>{member.name}, {calculateAge(member.dateOfBirth)}</span>
                <span className='text-sm'>{member.city}</span>
            </div>
        </CardFooter>
    </Card>
  )
}
