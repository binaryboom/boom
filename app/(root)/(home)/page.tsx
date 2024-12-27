"use client"
import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/use-getCalls';
import React, { useEffect, useState } from 'react'


const Home = () => {
  const now = new Date();
  const {upcomingCalls}=useGetCalls();
  // console.log('uc',upcomingCalls)

  // const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  // const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  const [date, setDate] = useState(new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date()));

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 5000);

    return () => clearInterval(timeInterval);
  }, []);

  // Update date once per day
  useEffect(() => {
    const now = new Date();
    const timeUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

    const dateTimeout = setTimeout(() => {
      setDate(new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date()));
    }, timeUntilMidnight);

    return () => clearTimeout(dateTimeout);
  }, []);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            {/* Upcoming Meeting at: {upcomingCalls} PM */}
            {upcomingCalls && upcomingCalls.length>1 ? `You have ${upcomingCalls?.length} upcoming calls`: upcomingCalls?.length==1?`You have ${upcomingCalls?.length} upcoming call` : 'No upcoming calls'}
            
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList></MeetingTypeList>
    </section>
  )
}

export default Home
