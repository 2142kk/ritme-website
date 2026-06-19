import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import CaseStudiesClient from '@/components/admin/case-studies-client'

export default async function CaseStudiesPage() {
  const session = await auth()
  if (!session) {
    redirect('/admin/login')
  }

  const result = await db.query(
    `SELECT id, industry, title, description, outcome, image_url, display_order, is_published, created_at
     FROM case_studies
     ORDER BY display_order ASC`
  )
  const caseStudies = result.rows

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Case Studies</h1>
      <CaseStudiesClient initialCaseStudies={caseStudies} />
    </div>
  )
}
