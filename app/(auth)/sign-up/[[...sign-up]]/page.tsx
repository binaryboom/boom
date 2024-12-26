import { SignUp} from '@clerk/nextjs'
import React from 'react'

const signUpPage = () => {
  return (
    <main className='flex h-full w-full items-center justify-center'>
        <SignUp></SignUp>
    </main>
  )
}

export default signUpPage
