"use client"

import React, { useContext } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Lookup from "@/data/Lookup"
import { Button } from "../button"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { UserDetailContext } from "@/context/UserDetailContext"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import uuid4 from "uuid4"

const SigninDialog = ({ openDialog, closeDialog }) => {
  const { setUserDetail } = useContext(UserDetailContext)
  const createUser = useMutation(api.users.CreateUser)

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        )

        const user = userInfo.data

        await createUser({
          name: user.name,
          email: user.email,
          picture: user.picture,
          uid: uuid4(),
        })

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user))
        }

        setUserDetail(user)
        closeDialog(false)
      } catch (error) {
        console.error("Error during Google login:", error)
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error)
    },
  })

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>

          <DialogDescription asChild>
            <div className="flex flex-col items-center justify-center">
              <p className="mt-2 text-center text-muted-foreground text-sm">
                {Lookup.SIGNIN_SUBHEADING}
              </p>
            </div>
          </DialogDescription>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="font-bold text-2xl text-center text-white">
              {Lookup.SIGNIN_HEADING}
            </h2>

            <Button
              className="bg-blue-500 text-white hover:bg-blue-400 mt-3 gap-3"
              onClick={() => googleLogin()}
            >
              Sign In with Google
            </Button>

            <p className="mt-2 text-sm text-center text-muted-foreground">
              {Lookup.SIGNIn_AGREEMENT_TEXT}
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SigninDialog