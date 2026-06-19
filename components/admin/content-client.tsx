'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface Content {
  id: string
  section: string
  key: string
  value: string | null
  is_published: boolean
}

interface ContentClientProps {
  initialContent: Content[]
}

export default function ContentClient({ initialContent }: ContentClientProps) {
  const [content, setContent] = useState<Content[]>(initialContent)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const groupedContent = content.reduce(
    (acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []
      }
      acc[item.section].push(item)
      return acc
    },
    {} as Record<string, Content[]>
  )

  const sections = Object.keys(groupedContent).sort()

  const handleUpdateContent = async (item: Content, newValue: string) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          value: newValue,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update content')
      }

      setContent(
        content.map((c) => (c.id === item.id ? { ...c, value: newValue } : c))
      )

      toast({
        title: 'Success',
        description: 'Content saved',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save content',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublishContent = async (item: Content, isPublished: boolean) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          is_published: !isPublished,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update content')
      }

      setContent(
        content.map((c) =>
          c.id === item.id ? { ...c, is_published: !c.is_published } : c
        )
      )

      toast({
        title: 'Success',
        description: isPublished ? 'Content unpublished' : 'Content published',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to publish content',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue={sections[0]} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {sections.map((section) => (
          <TabsTrigger key={section} value={section} className="capitalize">
            {section}
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map((section) => (
        <TabsContent key={section} value={section} className="space-y-6">
          {groupedContent[section]?.map((item) => (
            <ContentEditor
              key={item.id}
              item={item}
              isLoading={isLoading}
              onUpdate={(newValue) => handleUpdateContent(item, newValue)}
              onPublish={(isPublished) => handlePublishContent(item, isPublished)}
            />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  )
}

function ContentEditor({
  item,
  isLoading,
  onUpdate,
  onPublish,
}: {
  item: Content
  isLoading: boolean
  onUpdate: (value: string) => void
  onPublish: (isPublished: boolean) => void
}) {
  const [value, setValue] = useState(item.value || '')
  const [hasChanged, setHasChanged] = useState(false)

  const handleChange = (newValue: string) => {
    setValue(newValue)
    setHasChanged(newValue !== item.value)
  }

  return (
    <div className="border rounded-lg p-6 bg-card space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold capitalize">{item.key}</label>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            item.is_published
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
          }`}
        >
          {item.is_published ? 'Published' : 'Draft'}
        </span>
      </div>

      <Textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isLoading}
        rows={4}
      />

      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => onPublish(item.is_published)}
          disabled={isLoading}
          variant="outline"
        >
          {item.is_published ? 'Unpublish' : 'Publish'}
        </Button>
        <Button
          onClick={() => {
            onUpdate(value)
            setHasChanged(false)
          }}
          disabled={isLoading || !hasChanged}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
