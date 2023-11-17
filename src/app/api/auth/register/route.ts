import { registerUser } from '@/service/auth.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const res = await request.json()
    const { email, password, name } = res
    const { status, message, newUser } = await registerUser({ email, password, name }) as any
    console.log(status, message, newUser);

    if (status === 200) {
      return NextResponse.json({ message: 'User created' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Failed to create user' }, { status: 400 })
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }
}