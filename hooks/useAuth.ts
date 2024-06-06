import { TUser } from "@/types/user"
import { TOKEN_STORAGE_NAME, USER_STORAGE_NAME } from "@/utils/storage"
import { useEffect, useState } from "react"

export const AUTH_STATUS = {
  UNKNOWN: -1,
  UNAUTHED: 0,
  AUTHED: 1,
}

export default function useAuth() {
  const [status, setStatus] = useState(AUTH_STATUS.UNKNOWN)
  const [user, setUser] = useState<TUser | undefined>()

  useEffect(
    () => {
      const token = localStorage.getItem(TOKEN_STORAGE_NAME)
      const user = localStorage.getItem(USER_STORAGE_NAME)
      if (token && user) {
        setStatus(AUTH_STATUS.AUTHED)
        setUser(JSON.parse(user))
      } else {
        setStatus(AUTH_STATUS.UNAUTHED)
      }
    },
    []
  )

  return {status, user}
}
