"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const EndCallButton = () => {
    const call=useCall()
    const router=useRouter()

    const {useLocalParticipant}=useCallStateHooks();
    const localParticipaint=useLocalParticipant();

    const isMeetOwner=localParticipaint && call?.state.createdBy && localParticipaint.userId === call.state.createdBy.id;

    if(!isMeetOwner) return null;
  return (
    <div>
      <Button className='bg-red-500' onClick={async()=>{
        call.endCall()
        router.push('/')
      }}>End Call for Everyone</Button>
    </div>
  )
}

export default EndCallButton
