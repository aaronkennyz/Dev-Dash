# Serverless website using NEXT-JS  && vercel
*| Author: DeepSeek | Confidence: null | Topic: Serverless website using NEXT-JS  && vercel #raw |*

## Step-by-Step Low-Token Migration Plan

### Phase 1: Project Setup (15 min)

1. **Create Next.js app**
```bash
npx create-next-app@latest futuresprint --typescript --tailwind --app --no-src-dir
cd futuresprint
```

2. **Install minimal deps**
```bash
npm install mongodb bcryptjs
```

### Phase 2: File Structure (10 min)

```
futuresprint/
├── app/
│   ├── api/
│   │   └── events/
│   │       ├── register/
│   │       │   └── route.ts      # POST /api/events/register
│   │       └── admin/
│   │           └── route.ts       # POST /api/events/admin
│   ├── admin/
│   │   └── page.tsx               # Admin dashboard
│   ├── components/
│   │   └── RegistrationModal.tsx  # Your modal as component
│   ├── lib/
│   │   └── mongodb.ts             # DB connection
│   ├── globals.css                 # Your CSS merged here
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                     # Main landing (your HTML)
```

### Phase 3: Copy Assets & Styles (15 min)

1. **Copy images** to `/public/assets/`
2. **Merge CSS** into `app/globals.css` (keep all your styles)
3. **Copy HTML** structure into `app/page.tsx`
4. **Replace script tags** with proper React/TypeScript

### Phase 4: Database Setup (10 min)

1. **Create `lib/mongodb.ts`**
```typescript
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!uri) throw new Error('Add MONGODB_URI to .env')

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
```

### Phase 5: API Routes (15 min)

1. **Registration API** - `app/api/events/register/route.ts`
```typescript
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const client = await clientPromise
    const db = client.db('futuresprint')
    
    await db.collection('registrations').insertOne({
      ...data,
      createdAt: new Date(),
      status: 'pending'
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
```

2. **Admin API** - `app/api/events/admin/route.ts`
```typescript
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    
    const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD!)
    if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const client = await clientPromise
    const db = client.db('futuresprint')
    
    const registrations = await db
      .collection('registrations')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    return NextResponse.json(registrations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
```

### Phase 6: Create Components (20 min)

1. **RegistrationModal Component** - `app/components/RegistrationModal.tsx`
```typescript
'use client'

import { useState } from 'react'

export default function RegistrationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    github: '',
    teamMembers: [''],
    bounty: 'health'
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) setSuccess(true)
    } catch (error) {
      alert('Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90">
      <div className="bg-white max-w-2xl w-full border-4 border-black">
        {/* Copy your modal HTML here, replace form with this logic */}
      </div>
    </div>
  )
}
```

2. **Admin Page** - `app/admin/page.tsx`
```typescript
'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [registrations, setRegistrations] = useState([])
  const [authed, setAuthed] = useState(false)

  const fetchRegistrations = async () => {
    const res = await fetch('/api/events/admin', {
      method: 'POST',
      body: JSON.stringify({ password })
    })
    if (res.ok) {
      setRegistrations(await res.json())
      setAuthed(true)
    } else alert('Wrong password')
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 border-4 border-black">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-black p-3 w-full mb-4"
            placeholder="Enter password"
          />
          <button onClick={fetchRegistrations} className="btn-solid w-full">
            Access Terminal
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">REGISTRATIONS</h1>
      <div className="grid gap-4">
        {registrations.map((reg: any) => (
          <div key={reg._id} className="border-4 border-black p-4 bg-white">
            <p><strong>{reg.firstName} {reg.lastName}</strong> - {reg.email}</p>
            <p>Bounty: {reg.bounty} | Team: {reg.teamMembers.filter(Boolean).length + 1}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Phase 7: Update Main Page (15 min)

1. **Convert** `index.html` to `app/page.tsx`
   - Add `'use client'` at top
   - Replace modal trigger functions
   - Add state for modal visibility

```typescript
'use client'

import { useState } from 'react'
import RegistrationModal from './components/RegistrationModal'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      {/* Your entire HTML converted to JSX */}
      {/* Replace all class with className */}
      {/* Replace onclick with onClick */}
      
      <RegistrationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  )
}
```

### Phase 8: Environment Variables (5 min)

Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://your-connection-string
ADMIN_PASSWORD=your-secure-password
```

### Phase 9: Deploy to Vercel (10 min)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/futuresprint.git
git push
```

2. **Deploy on Vercel**
   - Connect GitHub repo
   - Add env vars (MONGODB_URI, ADMIN_PASSWORD)
   - Deploy

### Phase 10: Test (5 min)

1. Test registration form
2. Visit `/admin` to view registrations
3. Verify MongoDB for stored data

---

**Total Time: ~2 hours**

The key is using MongoDB Atlas (free tier) and Vercel's serverless functions - no server maintenance needed!