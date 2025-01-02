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
  {
    id: '2',
    title: '创意营销方案模板',
    description: '适合市场营销提案的现代风格模板',
    thumbnailUrl: '/covers/cover_green02.png',
    downloadLink: 'https://www.alipan.com/s/1rnhgGNiPxu',
    tags: ['营销', '创意', '现代']
  },
  // 添加更多模板...
] 