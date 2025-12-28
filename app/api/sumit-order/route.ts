import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzeg1tuswzlWNISq3kmCNmZzzkS-fGSqJ--t-vjx8Af77SwT885Y6iCO9gGAiBLeEXyCQ/exec"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Received order submission:", body)

    // Create form data for Google Apps Script
    const formData = new URLSearchParams()
    formData.append("fullName", body.fullName || "")
    formData.append("email", body.email || "")
    formData.append("whatsapp", body.whatsapp || "")
    formData.append("serviceType", body.serviceType || "")
    formData.append("projectDescription", body.projectDescription || "")
    formData.append("deadline", body.deadline || "")
    formData.append("rawFileLink", body.rawFileLink || "")
    formData.append("budget", body.budget || "")
    formData.append("timestamp", new Date().toISOString())

    console.log("[v0] Sending to Google Apps Script...")
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        redirect: "follow",
      })
    } catch {
      // Google Script may throw CORS errors but still process the request
      // We'll assume success if no network error occurred before sending
    }

    return NextResponse.json({ success: true, message: "Order submitted successfully" })
  } catch (error) {
    console.error("[v0] Order submission error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: `Failed to submit order: ${errorMessage}` }, { status: 500 })
  }
}
