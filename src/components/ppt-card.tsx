import Image from 'next/image'
import { useState, useEffect } from 'react'
import { loadImageWithCache } from '@/lib/image-cache'
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card"
import { PPTTemplate } from "@/lib/types"

interface PPTCardProps {
  template: PPTTemplate;
  onDetailClick: () => void;
  onTagClick: (tag: string) => void;
}

export function PPTCard({ template, onDetailClick, onTagClick }: PPTCardProps) {
  const [imageSrc, setImageSrc] = useState(template.thumbnailUrl);

  useEffect(() => {
    async function loadCachedImage() {
      const cachedImage = await loadImageWithCache(template.thumbnailUrl);
      setImageSrc(cachedImage || '/default-image.png');
    }

    loadCachedImage();
  }, [template.thumbnailUrl]);

  return (
    <Card className="overflow-hidden">
      <div 
        className="relative aspect-video cursor-pointer hover:opacity-90 transition-opacity"
        onClick={onDetailClick}
      >
        <Image
          src={imageSrc}
          alt={template.title}
          fill
          className="object-cover"
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {template.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {template.tags.map(tag => (
            <button
              key={tag}
              onClick={(e) => {
                e.stopPropagation()
                onTagClick(tag)
              }}
              className="px-2 py-1 text-xs rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 