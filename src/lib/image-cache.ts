export function cacheImage(url: string, imageData: string) {
  try {
    localStorage.setItem(`image_cache_${url}`, imageData);
  } catch (error) {
    console.error('缓存图片失败', error);
  }
}

export function getCachedImage(url: string): string | null {
  return localStorage.getItem(`image_cache_${url}`);
}

export async function loadImageWithCache(url: string): Promise<string> {
  // 尝试从缓存获取
  const cachedImage = getCachedImage(url);
  if (cachedImage) {
    return cachedImage;
  }

  // 如果缓存中没有，则下载并缓存
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const imageData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    // 缓存图片
    cacheImage(url, imageData);
    return imageData;
  } catch (error) {
    console.error('图片加载失败', error);
    return url; // 返回原始URL作为备选
  }
} 