import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import ContentClient from '@/components/admin/content-client'

export default async function ContentPage() {
  const session = await auth()
  if (!session) {
    redirect('/admin/login')
  }

  const result = await db.query(
    `SELECT id, section, key, value, is_published
     FROM site_content
     ORDER BY section, key`
  )
  const content = result.rows

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Site Content</h1>

      <ContentClient initialContent={content} />
    </div>
  )
}
