# M2 Studio Backend Setup Guide

## Firebase Configuration Complete! ✅

Your backend is now fully configured with Firebase. Here's what has been set up:

### 1. Authentication
- Email/password authentication enabled
- User profiles stored in Firestore
- Auth state management with React Context
- Protected routes ready

### 2. Firestore Database Collections
The following collections will be automatically created when you start using them:

#### `users` Collection
```
{
  email: string
  displayName: string
  role: 'client' | 'admin'
  createdAt: timestamp
}
```

#### `orders` Collection
```
{
  userId: string
  userName: string
  userEmail: string
  serviceType: string
  description: string
  deadline: string
  status: 'pending' | 'working' | 'delivered'
  price: string
  createdAt: timestamp
  fileUrls: array
}
```

#### `messages` Collection
```
{
  orderId: string
  senderId: string
  senderRole: 'client' | 'admin'
  message: string
  createdAt: timestamp
  read: boolean
}
```

### 3. Firebase Storage
- File upload utilities ready
- Support for video files, images, and documents
- Progress tracking included

### 4. API Routes
- `/api/orders` - Create and fetch orders
- `/api/messages` - Send and fetch chat messages

### 5. Next Steps

1. **Test Authentication**: Try signing up at `/login`
2. **Place an Order**: Test the order form at `/order`
3. **Check Dashboard**: View orders at `/dashboard`

### 6. Firebase Console Setup (Optional)
If you need to configure additional features:
- Go to [Firebase Console](https://console.firebase.google.com)
- Select your project
- Enable any additional authentication providers
- Set up Storage rules if needed

### Environment Variables (Already Configured)
✅ NEXT_PUBLIC_FIREBASE_API_KEY
✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
✅ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
✅ NEXT_PUBLIC_FIREBASE_APP_ID

## Your backend is ready to use! 🚀
