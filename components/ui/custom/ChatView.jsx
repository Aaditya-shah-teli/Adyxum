"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

export const ChatView = () => {
    const {id} = useParams();
    const convex = useConvex();
    const {messages, setMessages} = useContext(MessagesContext);


    useEffect(() => {
        id&&GetWorkspaceData()
    },[id])
    // used to get workspace data using workspace id

    const GetWorkspaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id
        });
        setMessages(result?.messages)
        console.log(result)
    }
  return (
    <div>
        <div>
            {
                messages?.map((msg, index) => (
                    <div key={index}>
                        <h2>{msg.content}</h2>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
