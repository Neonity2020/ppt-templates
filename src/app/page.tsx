'use client'

import { useState } from 'react'
import { PPTCard } from '@/components/ui/ppt-card'
import { pptTemplates } from '@/lib/data'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import Image from "next/image";
import { PPTTemplate } from '@/lib/types'

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<PPTTemplate | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        PPT模板素材库
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pptTemplates.map(template => (
          <PPTCard 
            key={template.id} 
            template={template}
            onDetailClick={() => setSelectedTemplate(template)}
          />
        ))}
      </div>

      {selectedTemplate && (
        <Dialog 
          open={!!selectedTemplate} 
          onOpenChange={() => setSelectedTemplate(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTemplate.title}</DialogTitle>
              <DialogDescription>
                {selectedTemplate.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Image 
                src={selectedTemplate.thumbnailUrl}
                alt={selectedTemplate.title}
                width={600}
                height={400}
                className="rounded-md"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {selectedTemplate.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={selectedTemplate.downloadLink} 
                  target="_blank" 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  阿里云盘下载
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

