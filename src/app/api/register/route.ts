import { signUpUser } from '@/FirebaseProvider/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const res = await request.json()
    const { email, password } = res
    const isSuccessCreate = await signUpUser({ email, password });
    if (isSuccessCreate) {
      return NextResponse.json({ message: 'User created' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Failed to create user' }, { status: 400 })
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }
}