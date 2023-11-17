"use client";
import { Button, Input } from "antd";
import { useState } from "react";
import ClientAuthFormWrapper from "./ClientAuthFormWrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// client side to add interactivity using local state
export default function LoginForm() {
  const router = useRouter()
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      await signIn('credentials', {
        redirect: false,
        email: formValue.email,
        password: formValue.password,
      })
      router.push('/')
    } catch (error) {

    }
  }

  return (
    <ClientAuthFormWrapper>
      <div className="flex flex-col w-[40rem] gap-6">
        <div className="flex flex-row items-center">
          <div className="font-bold w-40">
            Email
          </div>
          <Input className="p-3"
            placeholder="Email" value={formValue.email} onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="font-bold w-40">
            Password
          </div>
          <Input.Password className="p-3"
            placeholder="Password" value={formValue.password} onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
          />
        </div>
        <div className="w-full">
          <Button
            className="w-full h-14 bg-slate-800 text-white font-medium text-lg"
            onClick={handleLogin}
            loading={isLoading}
          >
            Login
          </Button>
        </div>
        <div className="w-full">
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </ClientAuthFormWrapper>
  )
}