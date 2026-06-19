'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Plus, Trash2, Pencil, ChevronUp } from 'lucide-react'

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

const emptyCase: Omit<CaseStudy, 'id'> = {
  industry: '', title: '', description: '', outcome: '',
  image_url: '', display_order: 99, is_published: false,
}

export default function CaseStudiesEditor({ initialCaseStudies }: { initialCaseStudies: CaseStudy[] }) {
  const [cases, setCases] = useState<CaseStudy[]>(initialCaseStudies)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [addingNew, setAddingNew] = useState(false)
  const [newCase, setNewCase] = useState({ ...emptyCase })
  const [editDraft, setEditDraft] = useState<CaseStudy | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSaveNew = async () => {
    if (!newCase.title.trim() || !newCase.industry.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCase),
      })
      if (!res.ok) throw new Error('Failed to create')
      const created = await res.json()
      setCases([...cases, created])
      setNewCase({ ...emptyCase })
      setAddingNew(false)
      toast({ title: 'Case study created' })
    } catch {
      toast({ title: 'Error', description: 'Failed to create case study', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editDraft) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/case-studies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editDraft),
      })
      if (!res.ok) throw new Error('Failed to update')
      const updated = await res.json()
      setCases(cases.map((c) => (c.id === updated.id ? updated : c)))
      setExpandedId(null)
      setEditDraft(null)
      toast({ title: 'Case study saved' })
    } catch {
      toast({ title: 'Error', description: 'Failed to save case study', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this case study?')) return
    setIsLoading(true)
    try {
      await fetch('/api/admin/case-studies', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setCases(cases.filter((c) => c.id !== id))
      toast({ title: 'Case study deleted' })
    } catch {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleExpand = (cs: CaseStudy) => {
    if (expandedId === cs.id) {
      setExpandedId(null)
      setEditDraft(null)
    } else {
      setExpandedId(cs.id)
      setEditDraft({ ...cs })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => { setAddingNew(true); setExpandedId(null) }}>
          <Plus size={16} className="mr-1" /> Add Case Study
        </Button>
      </div>

      {addingNew && (
        <CaseStudyForm
          values={newCase}
          onChange={(field, val) => setNewCase({ ...newCase, [field]: val })}
          onSave={handleSaveNew}
          onCancel={() => { setAddingNew(false); setNewCase({ ...emptyCase }) }}
          isLoading={isLoading}
          title="New Case Study"
        />
      )}

      {cases.map((cs) => (
        <div key={cs.id} className="border rounded-lg bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0">
              <p className="font-semibold truncate">{cs.title}</p>
              <p className="text-sm text-muted-foreground">{cs.industry}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <span className={`text-xs ${cs.is_published ? 'text-green-600' : 'text-muted-foreground'}`}>
                {cs.is_published ? 'Published' : 'Draft'}
              </span>
              <Button size="sm" variant="ghost" onClick={() => toggleExpand(cs)}>
                {expandedId === cs.id ? <ChevronUp size={16} /> : <Pencil size={16} />}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(cs.id)} disabled={isLoading}>
                <Trash2 size={16} className="text-destructive" />
              </Button>
            </div>
          </div>

          {expandedId === cs.id && editDraft && (
            <div className="border-t px-4 pb-4">
              <CaseStudyForm
                values={editDraft}
                onChange={(field, val) => setEditDraft({ ...editDraft, [field]: val })}
                onSave={handleSaveEdit}
                onCancel={() => { setExpandedId(null); setEditDraft(null) }}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      ))}

      {cases.length === 0 && !addingNew && (
        <p className="text-center text-muted-foreground py-8">No case studies yet.</p>
      )}
    </div>
  )
}

function CaseStudyForm({
  values, onChange, onSave, onCancel, isLoading, title,
}: {
  values: Omit<CaseStudy, 'id'> | CaseStudy
  onChange: (field: string, val: string | number | boolean) => void
  onSave: () => void
  onCancel: () => void
  isLoading: boolean
  title?: string
}) {
  return (
    <div className="border rounded-lg p-4 bg-secondary/30 space-y-3 mt-1">
      {title && <p className="font-semibold text-sm">{title}</p>}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Industry *</label>
          <Input value={values.industry} onChange={(e) => onChange('industry', e.target.value)} placeholder="e.g. Mining & Heavy Industry" disabled={isLoading} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Title *</label>
          <Input value={values.title} onChange={(e) => onChange('title', e.target.value)} placeholder="Project title" disabled={isLoading} />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Description</label>
        <Textarea value={values.description} onChange={(e) => onChange('description', e.target.value)} placeholder="What was the challenge?" rows={3} disabled={isLoading} />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Outcome</label>
        <Textarea value={values.outcome} onChange={(e) => onChange('outcome', e.target.value)} placeholder="What was the result?" rows={3} disabled={isLoading} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Image URL (optional)</label>
          <Input value={values.image_url || ''} onChange={(e) => onChange('image_url', e.target.value)} placeholder="/uploads/..." disabled={isLoading} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Display Order</label>
          <Input type="number" value={values.display_order} onChange={(e) => onChange('display_order', parseInt(e.target.value))} disabled={isLoading} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="cs-published" checked={values.is_published} onChange={(e) => onChange('is_published', e.target.checked)} disabled={isLoading} className="w-4 h-4" />
        <label htmlFor="cs-published" className="text-sm">Published</label>
      </div>
      <div className="flex gap-2 justify-end pt-1">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={isLoading}>Cancel</Button>
        <Button size="sm" onClick={onSave} disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</Button>
      </div>
    </div>
  )
}
