'use client'

import { useState, useEffect } from 'react'
import { PPTCard } from '@/components/ppt-card'
import { pptTemplates } from '@/lib/data'
import { loadImageWithCache } from '@/lib/image-cache'
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
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedTemplateImage, setSelectedTemplateImage] = useState<string>('')

  // 获取所有唯一的标签
  const allTags = Array.from(
    new Set(pptTemplates.flatMap(template => template.tags))
  )

  // 根据选中的标签筛选模板
  const filteredTemplates = pptTemplates.filter(template => 
    selectedTags.length === 0 || 
    selectedTags.some(tag => template.tags.includes(tag))
  )

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  useEffect(() => {
    async function loadTemplateImage() {
      if (selectedTemplate) {
        const cachedImage = await loadImageWithCache(selectedTemplate.thumbnailUrl);
        setSelectedTemplateImage(cachedImage);
      }
    }

    loadTemplateImage();
  }, [selectedTemplate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        PPT模板素材库
      </h1>
      
      {/* 添加标签筛选区域 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">按标签筛选：</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 使用筛选后的模板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <PPTCard 
            key={template.id} 
            template={template}
            onDetailClick={() => setSelectedTemplate(template)}
            onTagClick={handleTagClick}
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
                src={selectedTemplateImage}
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

