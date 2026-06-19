'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      onChange?.(data.url);

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange?.('');
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        disabled={isLoading || disabled}
        className="hidden"
      />

      {value ? (
        <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-muted">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
          <button
            onClick={handleRemove}
            disabled={disabled}
            className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-background rounded-full transition-colors"
            type="button"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
          <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground">JPG, PNG, or WebP (max 5MB)</p>
        </div>
      )}

      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading || disabled}
        variant="outline"
        className="w-full"
      >
        {isLoading ? 'Uploading...' : value ? 'Replace Image' : 'Select Image'}
      </Button>
    </div>
  );
}
