import { getMemberByUserId } from '@/app/actions/memberActions';
import React, { ReactNode } from 'react';
import MemberSideBar from '../MemberSideBar';
import { notFound } from 'next/navigation';
import { Card } from '@heroui/react';

// Make sure to destructure params properly
export default async function Layout({ children, params }: { children: ReactNode; params: { userId: string } }) {
  try {
    // Fetch member data asynchronously using userId from params
    const member = await getMemberByUserId(params.userId);
    
    // If no member found, return 404 not found
    if (!member) return notFound();
    
    // Render layout with member sidebar and children content
    return (
      <div className='grid grid-cols-12 gap-5 h-[80vh]'>
        <div className="col-span-3">
          <MemberSideBar member={member} />
        </div>
        <div className='col-span-9'>
          <Card className='w-full mt-10 h-[80vh]'>
            {children}
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching member:", error);
    return notFound();
  }
}
