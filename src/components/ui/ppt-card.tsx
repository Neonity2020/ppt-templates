import Image from 'next/image'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PPTTemplate } from "@/lib/data"

interface PPTCardProps {
  template: PPTTemplate;
  onDetailClick: () => void;
}

export function PPTCard({ template, onDetailClick }: PPTCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-video mb-4">
          <Image 
            src={template.thumbnailUrl} 
            alt={template.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {template.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button onClick={onDetailClick}>查看详情</Button>
        </div>
      </CardContent>
    </Card>
  )
} 