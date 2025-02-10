import { getMemberByUserId } from '@/app/actions/memberActions';
import React, { ReactNode } from 'react';
import MemberSideBar from '../MemberSideBar';
import { notFound } from 'next/navigation';
import { Card } from '@heroui/react';
import { getAuthUserId } from '@/app/actions/authActions';

// Make sure to destructure params properly
export default async function Layout({ children }: { children: ReactNode }) {

  try {
    const userId= await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const basepath='/members/edit'
    const navLinks =[
      {name: 'Edit Profile', href:`${basepath}`},
      {name: 'Update Photo', href:`${basepath}/photos`},
  ]
    
    // Render layout with member sidebar and children content
    return (
      <div className='grid grid-cols-12 gap-5 h-[80vh]'>
        <div className="col-span-3">
          <MemberSideBar member={member}  navLinks={navLinks}/>
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
