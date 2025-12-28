import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "./firebase"

export interface UploadProgress {
  progress: number
  error?: string
  downloadURL?: string
}

export async function uploadFile(file: File, path: string, onProgress?: (progress: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (onProgress) {
          onProgress(progress)
        }
        console.log(`[v0] Upload is ${progress}% done`)
      },
      (error) => {
        console.error("[v0] Upload error:", error)
        reject(error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log("[v0] File available at:", downloadURL)
        resolve(downloadURL)
      },
    )
  })
}

export async function deleteFile(filePath: string): Promise<void> {
  try {
    const storageRef = ref(storage, filePath)
    await deleteObject(storageRef)
    console.log("[v0] File deleted successfully")
  } catch (error) {
    console.error("[v0] Error deleting file:", error)
    throw error
  }
}
