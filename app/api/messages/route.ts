import { type NextRequest, NextResponse } from "next/server"
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { MessageDocument } from "@/lib/firestore-types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const messageData: MessageDocument = {
      orderId: body.orderId,
      senderId: body.senderId,
      senderName: body.senderName,
      senderRole: body.senderRole,
      message: body.message,
      fileUrl: body.fileUrl,
      fileName: body.fileName,
      createdAt: new Date().toISOString(),
      read: false,
    }

    const docRef = await addDoc(collection(db, "messages"), messageData)

    return NextResponse.json({
      success: true,
      messageId: docRef.id,
      message: "Message sent successfully",
    })
  } catch (error: any) {
    console.error("[v0] Error sending message:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 })
    }

    const q = query(collection(db, "messages"), where("orderId", "==", orderId), orderBy("createdAt", "asc"))

    const querySnapshot = await getDocs(q)
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ success: true, messages })
  } catch (error: any) {
    console.error("[v0] Error fetching messages:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
