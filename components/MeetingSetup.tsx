import { DeviceSettings, ToggleVideoPreviewButton, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isMicCamEnabled, setIsMicCamEnabled] = useState(false)
    const call = useCall()

    if (!call) {
        throw new Error("Call not found")
    }

    useEffect(() => {
        if (isMicCamEnabled) {
            call?.camera.disable()
            call?.microphone.disable()
        }
        else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamEnabled, call?.camera, call?.microphone])
    return (
        // <div>
            <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
                <h1 className="mt-2 text-2xl font-bold">Meeting Setup</h1>
                <VideoPreview className='lg:w-1/2' />
                <div className="flex h-16 items-center justify-center gap-3">
                    <label className='flex items-center justify-center gap-2 font-medium'>

                        <input type="checkbox" checked={isMicCamEnabled} onChange={(e) => setIsMicCamEnabled(e.target.checked)} />

                        Join with mic and camera off
                    </label>
                    <DeviceSettings />
                </div>

                <Button className='rounded-md bg-green-500  px-4 py-2.5' onClick={() => { call.join();setIsSetupComplete(true) }}>Join Meeting</Button>
                
            </div>

        // </div> 
    )
}

export default MeetingSetup
