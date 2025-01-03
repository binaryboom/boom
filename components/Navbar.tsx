"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { UserButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href={'/'} className='flex items-center gap-1'>
        <Image src={"/icons/logo.svg"} width={32} height={32} alt='Logo' className='max-sm:size-10'></Image>

        <p className="text-[26px] text-white font-extrabold max-sm:hidden">
          Boom
        </p>
      </Link>

      <div className="flex-between gap-5">
        {/* clerk user management */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>

    </nav>
  )
}

export default Navbar
