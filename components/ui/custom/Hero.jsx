"use client"
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext, useState } from 'react'
import SigninDialog from './SignInDialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'


const Hero = () => {
    const [userInput, setUserInput] = useState();
    const {messages, setMessages} = useContext(MessagesContext);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();
    const onGenerate = async (input) => {
        if (!userDetail?.name) {
            setOpenDialog(true)
            return;
        }
        const msg = {
            role:"user",
            content:input
        }
        setMessages(msg)
        const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            messages:[msg]
        });
        console.log(workspaceId);
        router.push('/workspace/' + workspaceId);
    }

    return (
        <div className='flex flex-col items-center xl:mt-52 mt-36 gap-2'>
            <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
            <p className='font-medium text-gray-400'>{Lookup.HERO_DESC}</p>
            <div className='p-5 border rounded-xl max-w-2xl w-full mt-3' style={{backgroundColor:Colors.BACKGROUND}}>
                <div className='flex gap-2'>
                    <textarea onChange={(e) => setUserInput(e.target.value)} placeholder={Lookup.INPUT_PLACEHOLDER} className='outline-none bg-transparent w-full h-32 max-h-52 resize-none' />
                    {userInput && <ArrowRight onClick={() => onGenerate(userInput)} className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer' />}
                </div>
                <div>
                    <Link className='h-5 w-5'/>
                </div>
            </div>
            <div className='flex flex-wrap max-w-2xl items-center justify-center gap-3'>
                {
                    Lookup.SUGGSTIONS.map((suggstion, index) => (
                        <h2 onClick={() => onGenerate(suggstion)} className='px-2 p-1 text-sm text-gray-400 hover:bg-accent cursor-pointer border rounded-full' key={index}>{suggstion}</h2>
                    )) 
                }
            </div>
            <SigninDialog openDialog={openDialog} closeDialog={() =>setOpenDialog(false)}/>
        </div>
    )
}

export default Hero