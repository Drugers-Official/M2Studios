import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Validate required fields
    const requiredFields = ["fullName", "email", "whatsapp", "serviceType", "projectDescription"]
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    let orderId = null
    try {
      const orderData = {
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        serviceType: formData.serviceType,
        projectDescription: formData.projectDescription,
        deadline: formData.deadline || null,
        rawFileLink: formData.rawFileLink || null,
        budget: formData.budget || "Not specified",
        status: "pending",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        hasFiles: false,
        unreadMessages: 0,
      }

      const docRef = await addDoc(collection(db, "orders"), orderData)
      orderId = docRef.id
      console.log("[v0] Order saved to Firestore with ID:", orderId)
    } catch (firebaseError) {
      console.error("[v0] Firebase error:", firebaseError)
      // Continue with Discord/Sheets even if Firebase fails
    }

    const discordWebhook =
      "https://canary.discord.com/api/webhooks/1450562217731690687/FMFFtKAoecXs1CvJdnpNt8uIB9PYFoxCI0WzT_rznyHvj7baSTvBUQ7Vx5UvlHaN61Up"

    const googleSheetsWebhook =
      "https://script.google.com/macros/s/AKfycbxnAoOW_oB6ghUfMsT8ee8KTlk24140NZ1fMl_jTiP7bhOHuoxPSv-k_jBZw1ztuoPt/exec"

    // Send to Discord webhook
    try {
      await fetch(discordWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "🎬 New order received! <@&1449513575918997584> <@&1449513702419075092> <@&1449513679128236115>",
          embeds: [
            {
              title: "📦 New M2 Studio Order",
              color: 0xfacc15,
              fields: [
                {
                  name: "🆔 Order ID",
                  value: orderId || "Not saved",
                  inline: true,
                },
                {
                  name: "👤 Name",
                  value: formData.fullName,
                  inline: true,
                },
                {
                  name: "📧 Email",
                  value: formData.email,
                  inline: true,
                },
                {
                  name: "📱 WhatsApp",
                  value: formData.whatsapp,
                  inline: true,
                },
                {
                  name: "🎯 Service",
                  value: formData.serviceType,
                  inline: true,
                },
                {
                  name: "💰 Budget",
                  value: formData.budget || "Not specified",
                  inline: true,
                },
                {
                  name: "📅 Deadline",
                  value: formData.deadline || "Not specified",
                  inline: true,
                },
                {
                  name: "📝 Description",
                  value: formData.projectDescription.substring(0, 1024),
                  inline: false,
                },
                {
                  name: "🔗 Raw Files",
                  value: formData.rawFileLink || "Not provided",
                  inline: false,
                },
              ],
              timestamp: new Date().toISOString(),
              footer: {
                text: "M2 Studio Orders",
              },
            },
          ],
        }),
      })
    } catch (error) {
      console.error("Discord webhook error:", error)
    }

    try {
      await fetch(googleSheetsWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId || "N/A",
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          serviceType: formData.serviceType,
          projectDescription: formData.projectDescription,
          deadline: formData.deadline || "Not specified",
          rawFileLink: formData.rawFileLink || "Not provided",
          budget: formData.budget || "Not specified",
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Google Sheets error:", error)
    }

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully!",
      orderId: orderId,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to submit order" }, { status: 500 })
  }
}
