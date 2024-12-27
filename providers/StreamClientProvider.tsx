"use client"

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {

    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";


const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const userId = "user-id";
    
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const router=useRouter()
    const { user, isLoaded } = useUser();

    
    // useEffect(() => {

    //     if (!user){ 
    //         router.push('/sign-in')
    //     };
    //     if (!isLoaded || !user) return;

    //     if (!apiKey) throw new Error("Stream API key missing !");
    //     const client = new StreamVideoClient({
    //         apiKey,
    //         user: {
    //             id: user?.id,
    //             name: user?.username || user?.id,
    //             image: user?.imageUrl
    //         },
    //         tokenProvider
    //     })
    
    //     setVideoClient(client)
    // }, [user, isLoaded])

    useEffect(() => {
        // Wait until the user state is loaded
        if (!isLoaded) return;
    
        // If there is no user, redirect to sign-in page
        if (!user) {
            router.push('/sign-in');
        } else {
            if (!apiKey) throw new Error("Stream API key missing!");
            
            const client = new StreamVideoClient({
                apiKey,
                user: {
                    id: user.id,
                    name: user.username || user.id,
                    image: user.imageUrl,
                },
                tokenProvider,
            });
    
            setVideoClient(client);
        }
    }, [user, isLoaded, apiKey, router]);
    
    if(!videoClient) return <Loader/>
    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};

export default StreamVideoProvider