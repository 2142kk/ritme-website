'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import ProductsEditor from './products-editor'
import CaseStudiesEditor from './case-studies-editor'

interface SiteContent {
  id: string
  section: string
  key: string
  value: string | null
  is_published: boolean
}

interface Product {
  id: string
  name: string
  tagline: string
  description: string
  status: string
  link: string | null
  display_order: number
  is_published: boolean
}

interface CaseStudy {
  id: string
  industry: string
  title: string
  description: string
  outcome: string
  image_url: string | null
  display_order: number
  is_published: boolean
}

interface Props {
  initialContent: SiteContent[]
  initialProducts: Product[]
  initialCaseStudies: CaseStudy[]
}

export default function SiteBuilderClient({ initialContent, initialProducts, initialCaseStudies }: Props) {
  const heroContent = initialContent.filter((c) => c.section === 'hero')
  const otherContent = initialContent.filter((c) => c.section !== 'hero')
  const otherSections = [...new Set(otherContent.map((c) => c.section))].sort()

  return (
    <Tabs defaultValue="hero">
      <TabsList className="mb-6">
        <TabsTrigger value="hero">Hero</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="work">Work</TabsTrigger>
        {otherSections.length > 0 && <TabsTrigger value="other">Other</TabsTrigger>}
      </TabsList>

      <TabsContent value="hero">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Edit the main headline and subheadline shown on the homepage.</p>
          {heroContent.map((item) => (
            <ContentField key={item.id} item={item} />
          ))}
          {heroContent.length === 0 && (
            <p className="text-muted-foreground py-4">No hero content found in the database.</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="products">
        <ProductsEditor initialProducts={initialProducts} />
      </TabsContent>

      <TabsContent value="work">
        <CaseStudiesEditor initialCaseStudies={initialCaseStudies} />
      </TabsContent>

      {otherSections.length > 0 && (
        <TabsContent value="other">
          <div className="space-y-8">
            {otherSections.map((section) => (
              <div key={section}>
                <h3 className="text-sm font-semibold capitalize mb-3 text-muted-foreground tracking-wide uppercase">{section}</h3>
                <div className="space-y-4">
                  {otherContent.filter((c) => c.section === section).map((item) => (
                    <ContentField key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      )}
    </Tabs>
  )
}

function ContentField({ item }: { item: SiteContent }) {
  const [value, setValue] = useState(item.value || '')
  const [isDirty, setIsDirty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const isLong = (item.value?.length ?? 0) > 80 || item.key.includes('subtitle') || item.key.includes('subheadline') || item.key.includes('description')

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, value }),
      })
      if (!res.ok) throw new Error('Failed')
      setIsDirty(false)
      toast({ title: 'Saved', description: `${item.key} updated` })
    } catch {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-card space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold capitalize">{item.key.replace(/_/g, ' ')}</label>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          item.is_published
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
            : 'bg-secondary text-muted-foreground'
        }`}>
          {item.is_published ? 'Published' : 'Draft'}
        </span>
      </div>
      {isLong ? (
        <Textarea
          value={value}
          onChange={(e) => { setValue(e.target.value); setIsDirty(e.target.value !== (item.value || '')) }}
          rows={4}
          disabled={isLoading}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => { setValue(e.target.value); setIsDirty(e.target.value !== (item.value || '')) }}
          disabled={isLoading}
        />
      )}
      <div className="flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={!isDirty || isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  )
}
