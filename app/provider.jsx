"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/ui/custom/Header'
import './styles/glowingball.css'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Provider = ({ children }) => {
  const [messages, setMessages] = useState()
  const [userDetail, setUserDetail] = useState()
  const convex = useConvex()

  useEffect(() => {
    IsAutheicated()
  }, [])

  const IsAutheicated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"))
      if (user?.email) {
        const result = await convex.query(api.users.GetUser, {
          email: user.email,
        })
        setUserDetail(result)
        console.log(result)
      }
    }
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <div className="relative min-h-screen overflow-hidden">
            {/* Glowing Ball */}
            <div className="glowing-ball"></div>

            {/* Theme and Content */}
            <NextThemesProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
            </NextThemesProvider>
          </div>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  )
}

export default Provider