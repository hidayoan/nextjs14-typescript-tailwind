"use client";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClientAuthFormWrapper from "./ClientAuthFormWrapper";
import Link from "next/link";
import axios from "axios";

// client side to add interactivity using local state
export default function RegisterForm() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleRegister = async () => {
    try {
      const res = await axios.post('/api/auth/register', formValue)
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
            Name
          </div>
          <Input className="p-3"
            placeholder="Name" value={formValue.name} onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
          />
        </div>
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

        <div className="w-full">
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </ClientAuthFormWrapper>
  )
}