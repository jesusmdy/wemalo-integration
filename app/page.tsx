"use client"

import useAuth, { AUTH_STATUS } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { Fragment, useEffect } from "react"

export default function App() {
  const {status} = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (status === AUTH_STATUS.UNAUTHED) {
        router.push("/login")
      } else if (status === AUTH_STATUS.AUTHED) {
        router.push("/products")
      }
    },
    [status]
  )
  return Fragment
}