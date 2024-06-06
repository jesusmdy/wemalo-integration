"use client"

import { inputClassNames } from "@/utils/classes";
import { fetcher } from "@/utils/fetcher";
import { TOKEN_STORAGE_NAME, USER_STORAGE_NAME } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useState } from "react"
import { useForm } from "react-hook-form"

interface Form {
  email: string;
  password: string;
}

function LoginForm() {
  const form = useForm<Form>()
  const router = useRouter()

  async function handleSubmit(values: Form) {
    const request = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(values),
    })
    const data = await request.json()
    if (request.status === 401) {
      return alert(data.message)
    }
    if (request.status === 404) {
      return alert(data.message)
    }
    if (request.status === 200) {
      localStorage.setItem(TOKEN_STORAGE_NAME, data.token)
      localStorage.setItem(USER_STORAGE_NAME, JSON.stringify(data.user))
      router.push("/")
    }
  }


  return (
    <form
      className="border bg-white dark:border-zinc-700 dark:bg-zinc-800 w-full max-w-sm flex flex-col p-4 gap-4 rounded-md py-8"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <p className="text-xl">Continue with your account</p>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Your email"
          {...form.register("email", {required: true})}
          className={inputClassNames}
        />
        <input
          type="password"
          placeholder="Your password"
          {...form.register("password", {required: true})}
          className={inputClassNames}
        />
      </div>
      <button type="submit" className="px-4 py-2 text-xs font-bold bg-purple-500 text-purple-50 rounded-md">Submit</button>
    </form>
  )
}

export default LoginForm