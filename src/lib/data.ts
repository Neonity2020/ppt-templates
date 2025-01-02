export interface PPTTemplate {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  downloadLink: string;
  tags: string[];
}

export const pptTemplates: PPTTemplate[] = [
  {
    id: '1',
    title: '商务蓝色简约模板',
    description: '适合企业年终汇报的精美PPT模板',
    thumbnailUrl: '/covers/cover_green.png',
    downloadLink: 'https://www.alipan.com/s/bfdSgRtufqD',
    tags: ['商务', '简约', '蓝色']
  },
  // 添加更多模板...
] 