"use client";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClientAuthFormWrapper from "./ClientAuthFormWrapper";

// client side to add interactivity using local state
export default function RegisterForm() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleRegister = async () => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValue)
      })
      router.push('/login')
    } catch (error) {
      console.log(error);
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
            onClick={handleRegister}
            loading={isLoading}
          >
            Register
          </Button>
        </div>
      </div>
    </ClientAuthFormWrapper>
  )
}