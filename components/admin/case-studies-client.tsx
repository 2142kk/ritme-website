'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Trash2, Eye } from 'lucide-react'

interface CaseStudy {
  id: string
  industry: string
  title: string
  description: string
  outcome: string
  image_url: string | null
  display_order: number
  is_published: boolean
  created_at: string
}

interface CaseStudiesClientProps {
  initialCaseStudies: CaseStudy[]
}

export default function CaseStudiesClient({ initialCaseStudies }: CaseStudiesClientProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/case-studies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !isPublished }),
      })

      if (!response.ok) {
        throw new Error('Failed to update case study')
      }

      setCaseStudies(
        caseStudies.map((cs) =>
          cs.id === id ? { ...cs, is_published: !cs.is_published } : cs
        )
      )

      toast({
        title: 'Success',
        description: isPublished ? 'Case study unpublished' : 'Case study published',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/case-studies', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete case study')
      }

      setCaseStudies(caseStudies.filter((cs) => cs.id !== id))

      toast({
        title: 'Success',
        description: 'Case study deleted',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/50 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-semibold">Industry</th>
              <th className="text-left py-3 px-4 font-semibold">Title</th>
              <th className="text-left py-3 px-4 font-semibold">Order</th>
              <th className="text-center py-3 px-4 font-semibold">Status</th>
              <th className="text-right py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseStudies.map((cs) => (
              <tr key={cs.id} className="border-b hover:bg-secondary/30">
                <td className="py-3 px-4">{cs.industry}</td>
                <td className="py-3 px-4">{cs.title}</td>
                <td className="py-3 px-4">{cs.display_order}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cs.is_published
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {cs.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={() => handleTogglePublish(cs.id, cs.is_published)}
                      disabled={isLoading}
                      size="sm"
                      variant="outline"
                    >
                      {cs.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      onClick={() => handleDelete(cs.id)}
                      disabled={isLoading}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caseStudies.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          No case studies found
        </div>
      )}
    </div>
  )
}
