"use client"

import useAuth, { AUTH_STATUS } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react"

export function Splash() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="size-12 border-4 border-t-purple-500 rounded-full animate-spin"></div>
    </div>
  )
}

const AuthLayout: FC<PropsWithChildren> = ({children}) => {
  const {status} = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if(status === AUTH_STATUS.UNAUTHED) {
        router.push("/login")
      }
    },
    [status],
  )
  if(status === AUTH_STATUS.UNKNOWN) {
    return <Splash />
  }
  return children;
}

export default AuthLayout