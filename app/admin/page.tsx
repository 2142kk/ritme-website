import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

export default async function AdminDashboard() {
  const session = await auth()
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch dashboard stats
  const totalLeadsResult = await db.query('SELECT COUNT(*) as count FROM leads')
  const totalLeads = parseInt(totalLeadsResult.rows[0].count) || 0

  const newLeadsResult = await db.query(
    `SELECT COUNT(*) as count FROM leads
     WHERE created_at >= NOW() - INTERVAL '7 days'`
  )
  const newLeadsThisWeek = parseInt(newLeadsResult.rows[0].count) || 0

  const contactedResult = await db.query(
    `SELECT COUNT(*) as count FROM leads WHERE status = 'contacted'`
  )
  const contacted = parseInt(contactedResult.rows[0].count) || 0

  const convertedResult = await db.query(
    `SELECT COUNT(*) as count FROM leads WHERE status = 'converted'`
  )
  const converted = parseInt(convertedResult.rows[0].count) || 0

  // Fetch recent leads
  const recentLeadsResult = await db.query(
    `SELECT id, name, email, company, created_at, status
     FROM leads
     ORDER BY created_at DESC
     LIMIT 5`
  )
  const recentLeads = recentLeadsResult.rows

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm text-muted-foreground mb-2">Total Leads</p>
          <p className="text-2xl font-bold">{totalLeads}</p>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm text-muted-foreground mb-2">New This Week</p>
          <p className="text-2xl font-bold">{newLeadsThisWeek}</p>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm text-muted-foreground mb-2">Contacted</p>
          <p className="text-2xl font-bold">{contacted}</p>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm text-muted-foreground mb-2">Converted</p>
          <p className="text-2xl font-bold">{converted}</p>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Recent Leads</h2>
        {recentLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Email</th>
                  <th className="text-left py-2 px-4">Company</th>
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-secondary/50">
                    <td className="py-2 px-4">{lead.name}</td>
                    <td className="py-2 px-4">{lead.email}</td>
                    <td className="py-2 px-4">{lead.company || '—'}</td>
                    <td className="py-2 px-4">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lead.status === 'new'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                            : lead.status === 'contacted'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                              : lead.status === 'converted'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground">No leads yet</p>
        )}
      </div>
    </div>
  )
}
