import type { FaviconOptions, StatusType } from '../types';

export class FaviconStatus {
  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private ctx: CanvasRenderingContext2D;
  private originalImage: HTMLImageElement = new Image();
  private options: Required<Omit<FaviconOptions, 'originalFaviconUrl'>> & Pick<FaviconOptions, 'originalFaviconUrl'>;
  private currentFaviconElement: HTMLLinkElement | null = null;

  constructor(options: FaviconOptions) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.options = {
      size: 32,
      dotSize: 4,
      dotPosition: { x: 24, y: 24 },
      statusColors: {
        pending: '#FFA500',
        success: '#4CAF50',
        error: '#f44336'
      },
      ...options
    };

    this.loadOriginalFavicon();
  }

  private loadOriginalFavicon(): void {
    this.originalImage.crossOrigin = 'anonymous';
    
    const timeout = setTimeout(() => {
      console.error('Favicon 加载超时，请检查路径是否正确：', this.options.originalFaviconUrl);
    }, 5000);
    
    this.originalImage.onload = () => {
      clearTimeout(timeout);
      this.drawFavicon();
    };
    
    this.originalImage.onerror = (e) => {
      clearTimeout(timeout);
      console.error('Favicon 加载失败，可能的原因：\n' +
        '1. 文件路径不正确\n' +
        '2. 文件不存在\n' +
        '3. 跨域访问被限制\n' +
        '详细错误：', e);
    };
    
    this.originalImage.src = this.options.originalFaviconUrl;
  }

  private drawFavicon(status?: StatusType): void {
    this.canvas.width = this.options.size;
    this.canvas.height = this.options.size;
    
    this.ctx.clearRect(0, 0, this.options.size, this.options.size);
    
    this.ctx.drawImage(
      this.originalImage,
      0,
      0,
      this.options.size,
      this.options.size
    );

    if (status && this.options.statusColors[status]) {
      const { x, y } = this.options.dotPosition;
      const radius = this.options.dotSize / 2;

      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.options.statusColors[status];
      this.ctx.fill();
    }

    this.updateFaviconElement();
  }

  private updateFaviconElement(): void {
    const newFaviconUrl = this.canvas.toDataURL('image/png');
    
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }

    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.href = newFaviconUrl;
    document.head.appendChild(newFavicon);
    
    this.currentFaviconElement = newFavicon;
  }

  public updateStatus(status: StatusType): void {
    this.drawFavicon(status);
  }

  public destroy(): void {
    if (this.currentFaviconElement) {
      this.currentFaviconElement.href = this.options.originalFaviconUrl;
    }
  }
} 