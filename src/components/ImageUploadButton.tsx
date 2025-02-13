'use client'

import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import React from 'react'
import { HiPhoto} from 'react-icons/hi2'
type Props= {
    onUploadImage: (resul: CloudinaryUploadWidgetInfo )=> void;
}
export default function ImageUploadButton( {onUploadImage} : Props) {
  return (
    <CldUploadButton 
    options={{maxFiles:1}}
    onSuccess={onUploadImage}
    signatureEndpoint='/api/sign-image'  
    uploadPreset='nm-demo' className='flex items-center gap-2 border-2 border-secondary text-secondary rounded-lg py-2 px-4 hover:bg-secondary/10'
    
    >
<HiPhoto size={30}/> Upload new image
    </CldUploadButton>
  )
}
