import { CardHeader, Divider, CardBody } from '@heroui/react'
import React from 'react'

export default function Chatpage() {
  return (
    <>
        <CardHeader className='text-2xl font-semibold text-secondary'>
        Chats
    </CardHeader>
    <Divider/>
    <CardBody>
        chat here
    </CardBody>
    </>
  )
}
