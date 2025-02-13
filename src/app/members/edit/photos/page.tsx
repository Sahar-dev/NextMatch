import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberByUserId, getMemberPhotoesByUserID } from '@/app/actions/memberActions';
import DeleteButton from '@/components/DeleteButton';
import StartButton from '@/components/StartButton';
import { CardHeader, Divider, CardBody } from '@heroui/react'
import React from 'react'
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberImage from '@/components/MemberImage';
import MemberPhotos from '@/components/MemberPhotos';

export default async function  PhotosPage() {
    const userId = await getAuthUserId();
    const member= await getMemberByUserId(userId);
    const photos= await getMemberPhotoesByUserID(await userId);
  return (
    <>
    <CardHeader className='flex flex-row justify-between items-center'>
     <div className='text-2xl font-semibold text-secondary'>Edit Profile</div>
     <MemberPhotoUpload />
    </CardHeader>
    <Divider />
   
    <CardBody>
    
      <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image}/>
    </CardBody>
  </>
  )
}
