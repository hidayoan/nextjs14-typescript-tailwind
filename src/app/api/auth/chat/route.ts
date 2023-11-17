import { getChats } from '@/FirebaseProvider/chat';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get('id') || '';
    const skip = Number(searchParams.get('skip')) || 0;
    const limit = Number(searchParams.get('limit')) || 10;
    const chats = await getChats({ id, skip, limit });
    return NextResponse.json(chats, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }
}