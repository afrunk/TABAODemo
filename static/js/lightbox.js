/**
 * Lightbox 灯箱组件
 * 支持图片全屏查看、缩放、导航、键盘操作
 */

class Lightbox {
    constructor(options = {}) {
        this.options = {
            animation: 'fade',
            animationDuration: 300,
            closeOnClick: true,
            closeOnEsc: true,
            showCounter: true,
            enableZoom: true,
            enableDownload: true,
            enableArrowNav: true,
            ...options
        };
        
        this.images = [];
        this.currentIndex = 0;
        this.isOpen = false;
        this.scale = 1;
        
        this.init();
    }
    
    init() {
        // 创建 DOM 结构
        this.createDOM();
        
        // 绑定事件
        this.bindEvents();
    }
    
    createDOM() {
        const html = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-content" id="lightbox-content">
                    <img src="" alt="" class="lightbox-image" id="lightbox-image">
                    <div class="lightbox-loading" id="lightbox-loading" style="display:none;"></div>
                </div>
                
                <button class="lightbox-close" id="lightbox-close">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                ${this.options.enableArrowNav ? `
                <button class="lightbox-nav lightbox-prev" id="lightbox-prev">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <button class="lightbox-nav lightbox-next" id="lightbox-next">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
                ` : ''}
                
                <div class="lightbox-info" id="lightbox-info" style="display:none;">
                    <div class="lightbox-title" id="lightbox-title"></div>
                    ${this.options.showCounter ? '<div class="lightbox-counter" id="lightbox-counter"></div>' : ''}
                </div>
                
                ${this.options.enableDownload ? `
                <a class="lightbox-download" id="lightbox-download" download>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    下载
                </a>
                ` : ''}
                
                ${this.options.enableZoom ? `
                <div class="lightbox-zoom">
                    <button onclick="lightbox.zoomIn()" title="放大">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                        </svg>
                    </button>
                    <button onclick="lightbox.zoomOut()" title="缩小">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
                        </svg>
                    </button>
                    <button onclick="lightbox.resetZoom()" title="重置">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                    </button>
                </div>
                ` : ''}
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
        
        // 缓存 DOM 元素
        this.lightbox = document.getElementById('lightbox');
        this.content = document.getElementById('lightbox-content');
        this.image = document.getElementById('lightbox-image');
        this.loading = document.getElementById('lightbox-loading');
        this.info = document.getElementById('lightbox-info');
        this.title = document.getElementById('lightbox-title');
        this.counter = document.getElementById('lightbox-counter');
        this.download = document.getElementById('lightbox-download');
    }
    
    bindEvents() {
        // 关闭按钮
        document.getElementById('lightbox-close')?.addEventListener('click', () => this.close());
        
        // 点击背景关闭
        if (this.options.closeOnClick) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.close();
                }
            });
        }
        
        // 键盘导航
        if (this.options.closeOnEsc) {
            document.addEventListener('keydown', (e) => {
                if (!this.isOpen) return;
                
                switch (e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.prev();
                        break;
                    case 'ArrowRight':
                        this.next();
                        break;
                    case '+':
                    case '=':
                        this.zoomIn();
                        break;
                    case '-':
                        this.zoomOut();
                        break;
                    case '0':
                        this.resetZoom();
                        break;
                }
            });
        }
        
        // 箭头导航
        if (this.options.enableArrowNav) {
            document.getElementById('lightbox-prev')?.addEventListener('click', () => this.prev());
            document.getElementById('lightbox-next')?.addEventListener('click', () => this.next());
        }
        
        // 鼠标滚轮缩放
        this.content?.addEventListener('wheel', (e) => {
            if (!this.options.enableZoom) return;
            e.preventDefault();
            if (e.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        });
    }
    
    open(images, startIndex = 0) {
        this.images = Array.isArray(images) ? images : [images];
        this.currentIndex = Math.max(0, Math.min(startIndex, this.images.length - 1));
        this.scale = 1;
        
        this.showCurrentImage();
        
        this.lightbox.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.lightbox.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = '';
        this.scale = 1;
        this.resetZoom();
    }
    
    showCurrentImage() {
        const current = this.images[this.currentIndex];
        const src = typeof current === 'string' ? current : current.image_path;
        const title = typeof current === 'object' ? (current.title || '') : '';
        
        // 显示加载状态
        this.loading.style.display = 'block';
        this.image.style.opacity = '0';
        
        // 加载图片
        const img = new Image();
        img.onload = () => {
            this.image.src = src;
            this.image.alt = title;
            this.loading.style.display = 'none';
            this.image.style.opacity = '1';
            
            // 更新信息
            if (this.info) {
                this.info.style.display = 'block';
            }
            if (this.title) {
                this.title.textContent = title;
            }
            if (this.counter) {
                this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
            }
            if (this.download) {
                this.download.href = src;
            }
            
            // 更新导航按钮
            if (this.options.enableArrowNav) {
                document.getElementById('lightbox-prev').style.display = 
                    this.images.length > 1 ? 'flex' : 'none';
                document.getElementById('lightbox-next').style.display = 
                    this.images.length > 1 ? 'flex' : 'none';
            }
        };
        img.onerror = () => {
            this.loading.style.display = 'none';
            this.image.style.opacity = '1';
        };
        img.src = src;
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.resetZoom();
            this.showCurrentImage();
        }
    }
    
    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.resetZoom();
            this.showCurrentImage();
        }
    }
    
    zoomIn() {
        this.scale = Math.min(this.scale + 0.25, 3);
        this.applyZoom();
    }
    
    zoomOut() {
        this.scale = Math.max(this.scale - 0.25, 0.5);
        this.applyZoom();
    }
    
    resetZoom() {
        this.scale = 1;
        this.applyZoom();
    }
    
    applyZoom() {
        this.image.style.transform = `scale(${this.scale})`;
        
        if (this.scale > 1) {
            this.content.classList.add('zoomed');
        } else {
            this.content.classList.remove('zoomed');
        }
    }
}

// 创建全局实例
let lightbox;

document.addEventListener('DOMContentLoaded', () => {
    lightbox = new Lightbox();
});

// 便捷函数
function openLightbox(src, index = 0, images = null) {
    if (images) {
        lightbox.open(images.map(img => typeof img === 'string' ? img : img.image_path), index);
    } else {
        lightbox.open(src);
    }
}
