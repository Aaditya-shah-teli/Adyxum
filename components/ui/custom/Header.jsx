import Image from 'next/image'
import React, { useContext } from 'react'
import { Button } from '../button'
import { UserDetailContext } from '@/context/UserDetailContext'

const Header = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  return (
    <div className='p-4 flex justify-between items-center'>
        {/* <Image src={'/logo.png'} alt='logo' width={40} height={40} /> */}
        <h2 className='font-bold hover:text-blue-300'>Adyxum</h2>
       {(!userDetail || !userDetail.name) && (
          <div className='flex gap-4'>
              <Button variant={"ghost"}>Sign In</Button>
              <Button className={'bg-blue-400 text-white'}>Get Started</Button>
          </div>
        )}
    </div>
  )
}

export default Header