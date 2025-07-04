import Image from 'next/image'
import React from 'react'
import { Button } from '../button'

const Header = () => {
  return (
    <div className='p-4 flex justify-between items-center'>
        {/* <Image src={'/logo.png'} alt='logo' width={40} height={40} /> */}
        <h2 className='font-bold hover:text-blue-300'>Adyxum</h2>
        <div className='flex gap-4'>
            <Button variant={"ghost"}>Sign In</Button>
            <Button className={'bg-blue-400 text-white'}>Get Started</Button>
        </div>
    </div>
  )
}

export default Header