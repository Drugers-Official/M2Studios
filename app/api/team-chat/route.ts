import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    if (webhookUrl) {
      // Send message to Discord webhook
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `**New Chat Message from M2 Studio Website**\n\n${message}\n\n---\n*Received at: ${new Date().toLocaleString()}*`,
          username: "M2 Studio Chat",
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
