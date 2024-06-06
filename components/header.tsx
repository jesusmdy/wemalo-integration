"use client"

import useAuth from "@/hooks/useAuth"
import { TOKEN_STORAGE_NAME, USER_STORAGE_NAME } from "@/utils/storage"
import { useRouter } from "next/navigation"
import ThemeSwitch from "./themeSwitch"
import Link from "next/link"

const Header = () => {
  const {user} = useAuth()
  const router = useRouter()
  function handleLogout() {
    localStorage.removeItem(TOKEN_STORAGE_NAME)
    localStorage.removeItem(USER_STORAGE_NAME)
    router.push("/login")
  }
  if (!user) return void null;
  return (
    <div className="flex border-b p-4 items-center dark:border-zinc-700 bg-white dark:bg-zinc-800">
      <Link href="/" className="text-lg font-bold">Wemalo</Link>
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <div className="flex gap-2 rounded-md items-center">
          <p className="text-xs">{`Welcome ${user.name}!`}</p>
          <button className="text-xs border dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 rounded-md px-2 py-1" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Header