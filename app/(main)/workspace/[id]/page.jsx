import { ChatView } from '@/components/ui/custom/ChatView'
import CodeView from '@/components/ui/custom/CodeView'
import React from 'react'

const Workspace = () => {
  return (
    <div className='p-10'>
        <div className='grid md:grid-cols-3 grid-cols-1'>
            <ChatView/>
            <div className=' col-span-2'>
            <CodeView/>
            </div>

        </div>
    </div>
  )
}

export default Workspace