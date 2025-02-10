import { getMemberByUserId } from '@/app/actions/memberActions';
import { CardBody, CardHeader, Divider } from '@heroui/react';
import { notFound } from 'next/navigation';
import React from 'react';

// Corrected version of MemberDetailedPage
export default async function MemberDetailedPage({ params }: { params: { userId: string } }) {
 
  const member = await getMemberByUserId(params.userId); // Await member fetch
  
  if (!member) return notFound(); // Return 404 if no member found
  
  return (
    <>
      <CardHeader className='text-2xl font-semibold text-secondary'>
        Profile
      </CardHeader>
      <Divider />
      <CardBody>
        {member.description}
      </CardBody>
    </>
  );
}
