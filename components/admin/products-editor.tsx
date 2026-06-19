'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Plus, Trash2, ChevronDown, ChevronUp, Pencil } from 'lucide-react'

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

const emptyProduct: Omit<Product, 'id'> = {
  name: '', tagline: '', description: '', status: 'coming_soon',
  link: '', display_order: 99, is_published: false,
}

export default function ProductsEditor({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [addingNew, setAddingNew] = useState(false)
  const [newProduct, setNewProduct] = useState({ ...emptyProduct })
  const [editDraft, setEditDraft] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSaveNew = async () => {
    if (!newProduct.name.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      if (!res.ok) throw new Error('Failed to create')
      const created = await res.json()
      setProducts([...products, created])
      setNewProduct({ ...emptyProduct })
      setAddingNew(false)
      toast({ title: 'Product created' })
    } catch {
      toast({ title: 'Error', description: 'Failed to create product', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editDraft) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editDraft),
      })
      if (!res.ok) throw new Error('Failed to update')
      const updated = await res.json()
      setProducts(products.map((p) => (p.id === updated.id ? updated : p)))
      setExpandedId(null)
      setEditDraft(null)
      toast({ title: 'Product saved' })
    } catch {
      toast({ title: 'Error', description: 'Failed to save product', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    setIsLoading(true)
    try {
      await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setProducts(products.filter((p) => p.id !== id))
      toast({ title: 'Product deleted' })
    } catch {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleExpand = (product: Product) => {
    if (expandedId === product.id) {
      setExpandedId(null)
      setEditDraft(null)
    } else {
      setExpandedId(product.id)
      setEditDraft({ ...product })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => { setAddingNew(true); setExpandedId(null) }}>
          <Plus size={16} className="mr-1" /> Add Product
        </Button>
      </div>

      {addingNew && (
        <ProductForm
          values={newProduct}
          onChange={(field, val) => setNewProduct({ ...newProduct, [field]: val })}
          onSave={handleSaveNew}
          onCancel={() => { setAddingNew(false); setNewProduct({ ...emptyProduct }) }}
          isLoading={isLoading}
          title="New Product"
        />
      )}

      {products.map((product) => (
        <div key={product.id} className="border rounded-lg bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-semibold ${
                product.status === 'available'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
              }`}>
                {product.status === 'available' ? 'Live' : 'Soon'}
              </span>
              <div className="min-w-0">
                <p className="font-semibold truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground truncate">{product.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <span className={`text-xs ${product.is_published ? 'text-green-600' : 'text-muted-foreground'}`}>
                {product.is_published ? 'Published' : 'Draft'}
              </span>
              <Button size="sm" variant="ghost" onClick={() => toggleExpand(product)}>
                {expandedId === product.id ? <ChevronUp size={16} /> : <Pencil size={16} />}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(product.id)} disabled={isLoading}>
                <Trash2 size={16} className="text-destructive" />
              </Button>
            </div>
          </div>

          {expandedId === product.id && editDraft && (
            <div className="border-t px-4 pb-4">
              <ProductForm
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

      {products.length === 0 && !addingNew && (
        <p className="text-center text-muted-foreground py-8">No products yet.</p>
      )}
    </div>
  )
}

function ProductForm({
  values, onChange, onSave, onCancel, isLoading, title,
}: {
  values: Omit<Product, 'id'> | Product
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
          <label className="text-xs font-medium text-muted-foreground">Name *</label>
          <Input value={values.name} onChange={(e) => onChange('name', e.target.value)} placeholder="Product name" disabled={isLoading} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <select
            value={values.status}
            onChange={(e) => onChange('status', e.target.value)}
            disabled={isLoading}
            className="w-full h-9 px-3 rounded-md border bg-background text-sm"
          >
            <option value="coming_soon">Coming Soon</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Tagline</label>
        <Input value={values.tagline} onChange={(e) => onChange('tagline', e.target.value)} placeholder="Short description" disabled={isLoading} />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Description</label>
        <Textarea value={values.description} onChange={(e) => onChange('description', e.target.value)} placeholder="Full description" rows={3} disabled={isLoading} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Link (optional)</label>
          <Input value={values.link || ''} onChange={(e) => onChange('link', e.target.value)} placeholder="https://..." disabled={isLoading} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Display Order</label>
          <Input type="number" value={values.display_order} onChange={(e) => onChange('display_order', parseInt(e.target.value))} disabled={isLoading} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="product-published" checked={values.is_published} onChange={(e) => onChange('is_published', e.target.checked)} disabled={isLoading} className="w-4 h-4" />
        <label htmlFor="product-published" className="text-sm">Published</label>
      </div>
      <div className="flex gap-2 justify-end pt-1">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={isLoading}>Cancel</Button>
        <Button size="sm" onClick={onSave} disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</Button>
      </div>
    </div>
  )
}
