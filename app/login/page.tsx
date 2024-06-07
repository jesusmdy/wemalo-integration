import LoginForm from "@/components/login/form";
import ThemeSwitch from "@/components/themeSwitch";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute right-0 top-0 p-4 border-b dark:border-b-zinc-700 w-full flex items-center justify-end ">
        <ThemeSwitch />
      </div>
      <LoginForm />
    </div>
  )
}