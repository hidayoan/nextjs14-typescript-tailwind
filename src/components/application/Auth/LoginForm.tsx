"use client";

import { useAppDispatch } from "@/app/store";
import { setAuth, setJid } from "@/app/store/slices/authSlice";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

// client side to add interactivity using local state
export default function LoginForm() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handleLogin = async () => {

  }

  return (
    <div className="flex flex-col w-[40rem] gap-6">
      <div className="flex flex-row items-center">
        <div className="font-bold w-40">
          Email
        </div>
        <Input className="p-3"
          placeholder="Username" value={formValue.username} onChange={(e) => setFormValue({ ...formValue, username: e.target.value })}
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
    </div>
  )
}