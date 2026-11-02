import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  const listId = process.env.EMAILOCTOPUS_LIST_ID;
  if (!apiKey || !listId) {
    return NextResponse.json({ error: 'EmailOctopus not configured' }, { status: 500 });
  }

  const res = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({
      email_address: email,
      status: 'SUBSCRIBED',
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data.error?.message || 'Subscription failed' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
