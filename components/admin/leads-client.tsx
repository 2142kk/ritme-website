'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Download, Trash2, Eye } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  message: string
  status: string
  notes: string | null
  created_at: string
  updated_at: string
}

interface LeadsClientProps {
  initialLeads: Lead[]
}

export default function LeadsClient({ initialLeads }: LeadsClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editNotes, setEditNotes] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const filteredLeads = leads.filter(
    (lead) => statusFilter === 'all' || lead.status === statusFilter
  )

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead)
    setEditStatus(lead.status)
    setEditNotes(lead.notes || '')
    setIsDialogOpen(true)
  }

  const handleSaveLead = async () => {
    if (!selectedLead) return
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLead.id,
          status: editStatus,
          notes: editNotes,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update lead')
      }

      const updatedLead = await response.json()

      setLeads(leads.map((l) => (l.id === updatedLead.id ? updatedLead : l)))
      setIsDialogOpen(false)

      toast({
        title: 'Success',
        description: 'Lead updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update lead',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteLead = async () => {
    if (!selectedLead) return
    setIsDeleting(true)

    try {
      const response = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLead.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete lead')
      }

      setLeads(leads.filter((l) => l.id !== selectedLead.id))
      setIsDialogOpen(false)

      toast({
        title: 'Success',
        description: 'Lead deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete lead',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Message', 'Status', 'Notes', 'Date']
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.company || '',
      lead.message.replace(/"/g, '""'),
      lead.status,
      (lead.notes || '').replace(/"/g, '""'),
      new Date(lead.created_at).toLocaleDateString(),
    ])

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleExportCSV}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download size={16} /> Export CSV
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Company</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-right py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-secondary/30">
                    <td className="py-3 px-4">{lead.name}</td>
                    <td className="py-3 px-4">{lead.email}</td>
                    <td className="py-3 px-4">{lead.company || '—'}</td>
                    <td className="py-3 px-4">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4 text-right">
                      <Button
                        onClick={() => handleViewLead(lead)}
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Eye size={14} /> View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-muted-foreground">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Name</label>
                  <p className="text-foreground">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email</label>
                  <p className="text-foreground">{selectedLead.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Company</label>
                <p className="text-foreground">{selectedLead.company || '—'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Message</label>
                <p className="text-foreground whitespace-pre-wrap">{selectedLead.message}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Notes</label>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4 justify-end pt-4">
                <Button
                  onClick={handleDeleteLead}
                  disabled={isSaving || isDeleting}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 size={14} /> Delete
                </Button>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                  disabled={isSaving || isDeleting}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveLead} disabled={isSaving || isDeleting}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
