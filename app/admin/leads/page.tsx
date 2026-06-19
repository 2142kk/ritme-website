import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import LeadsClient from '@/components/admin/leads-client'

export default async function LeadsPage() {
  const session = await auth()
  if (!session) {
    redirect('/admin/login')
  }

  const result = await db.query(
    `SELECT id, name, email, company, message, status, notes, created_at, updated_at
     FROM leads
     ORDER BY created_at DESC`
  )
  const leads = result.rows

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Leads</h1>
      </div>

      <LeadsClient initialLeads={leads} />
    </div>
  )
}
