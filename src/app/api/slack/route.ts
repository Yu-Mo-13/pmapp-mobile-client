// app/api/slack/route.js
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
    const slackMessage = {
      text: message,
    };

    await axios.post(webhookUrl!, slackMessage);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
