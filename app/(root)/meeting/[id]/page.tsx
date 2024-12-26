"use client"

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/use-getCallByID';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
// import React, {  useState } from 'react'

import React, { use, useState } from 'react'
const Meeting = ({params}:{params:Promise<{id:string}>}) => {
  // const {id}=await params;
  const {id}=use( params);

// bard
// const Meeting = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id } = await params; 

// const Meeting = ({params:{id}}:{params:{id:string}}) => {
  const {user,isLoaded}=useUser();

  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const {call,isCallLoading}=useGetCallById(id)
  console.log(id)
  if(!isLoaded || isCallLoading) return <Loader/>

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
        {
          isSetupComplete? <MeetingRoom/> :<MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
        }
        
        </StreamTheme>
      </StreamCall>

    </main>
  )
}

export default Meeting