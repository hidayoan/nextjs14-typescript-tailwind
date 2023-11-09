import { NextResponse } from 'next/server';

const baseURL = 'https://api.example.com'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }
}