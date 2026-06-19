import db from '@/lib/db'
import SiteBuilderClient from '@/components/admin/site-builder-client'

export default async function BuilderPage() {
  const [contentResult, productsResult, caseStudiesResult] = await Promise.all([
    db.query(`SELECT id, section, key, value, is_published FROM site_content ORDER BY section, key`),
    db.query(`SELECT id, name, tagline, description, status, link, display_order, is_published FROM products ORDER BY display_order ASC`),
    db.query(`SELECT id, industry, title, description, outcome, image_url, display_order, is_published FROM case_studies ORDER BY display_order ASC`),
  ])

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Site Builder</h1>
      <p className="text-muted-foreground mb-8">Edit all page content organized by section.</p>
      <SiteBuilderClient
        initialContent={contentResult.rows}
        initialProducts={productsResult.rows}
        initialCaseStudies={caseStudiesResult.rows}
      />
    </div>
  )
}
