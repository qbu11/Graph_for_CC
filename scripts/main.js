/*
 * 主JavaScript文件 - main.js
 * 核心功能和初始化
 */

// 全局状态管理
window.AppState = {
  currentSection: 'home',
  isLoading: true,
  scrollPosition: 0,
  animations: {
    enabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
};

// DOM Ready 事件
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 CC for MP AI Agent 架构展示系统初始化...');

  // 初始化各个模块
  initializeApp();
  initializeNavigation();
  initializeAnimations();
  initializeDiagrams();
  initializeScrollEffects();
  initializePerformanceOptimizations();

  // 加载完成后隐藏加载屏幕
  setTimeout(() => {
    hideLoadingScreen();
  }, 1500);
});

// 初始化应用
function initializeApp() {
  // 初始化Feather图标
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // 设置初始状态
  updateActiveSection('home');

  // 绑定全局事件
  bindGlobalEvents();

  console.log('✅ 应用初始化完成');
}

// 绑定全局事件
function bindGlobalEvents() {
  // 滚动事件
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // 窗口大小变化事件
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      handleResize();
    }, 150);
  });

  // 键盘导航
  document.addEventListener('keydown', function(e) {
    handleKeyboardNavigation(e);
  });

  // 返回顶部按钮
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      smoothScrollToTop();
    });
  }
}

// 处理滚动事件
function handleScroll() {
  const scrollY = window.scrollY;
  AppState.scrollPosition = scrollY;

  // 更新导航栏状态
  updateNavigationScroll(scrollY);

  // 更新返回顶部按钮
  updateBackToTopButton(scrollY);

  // 触发滚动动画
  triggerScrollAnimations();
}

// 更新导航栏滚动状态
function updateNavigationScroll(scrollY) {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  if (scrollY > 100) {
    nav.style.background = 'rgba(255, 255, 255, 0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.background = 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = 'none';
  }
}

// 更新返回顶部按钮
function updateBackToTopButton(scrollY) {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  if (scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

// 处理窗口大小变化
function handleResize() {
  // 重新初始化某些组件
  if (typeof mermaid !== 'undefined') {
    // 重新渲染图表
    setTimeout(() => {
      mermaid.init();
    }, 100);
  }

  console.log('📱 响应式布局调整完成');
}

// 键盘导航
function handleKeyboardNavigation(e) {
  // ESC 键关闭移动端菜单
  if (e.key === 'Escape') {
    closeMobileMenu();
  }

  // 数字键快速导航
  if (e.key >= '1' && e.key <= '7') {
    e.preventDefault();
    const sections = ['home', 'architecture', 'performance', 'algorithm', 'retrieval', 'metrics', 'value'];
    const index = parseInt(e.key) - 1;
    if (sections[index]) {
      navigateToSection(sections[index]);
    }
  }
}

// 隐藏加载屏幕
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      AppState.isLoading = false;
    }, 500);
  }

  // 触发首页动画
  triggerHomeAnimations();
}

// 触发首页动画
function triggerHomeAnimations() {
  if (!AppState.animations.enabled) return;

  const heroElements = [
    document.querySelector('.hero-title'),
    document.querySelector('.hero-subtitle'),
    document.querySelector('.hero-stats'),
    document.querySelector('.hero-actions')
  ];

  heroElements.forEach((element, index) => {
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';

      setTimeout(() => {
        element.style.transition = 'all 0.8s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 200 + index * 150);
    }
  });
}

// 平滑滚动到顶部
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 关闭移动端菜单
function closeMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');

  if (navMenu && navToggle) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
}

// 显示通知
function showNotification(message, type = 'info') {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // 添加样式
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    max-width: 400px;
    border-left: 4px solid var(--primary-color);
  `;

  // 添加到页面
  document.body.appendChild(notification);

  // 显示动画
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 100);

  // 绑定关闭事件
  const closeBtn = notification.querySelector('.notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      hideNotification(notification);
    });
  }

  // 自动关闭
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);
}

// 隐藏通知
function hideNotification(notification) {
  notification.style.opacity = '0';
  notification.style.transform = 'translateX(100%)';

  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// 工具函数
const Utils = {
  // 防抖函数
  debounce: function(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // 节流函数
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // 检测元素是否在视口中
  isInViewport: function(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // 检测元素是否部分可见
  isPartiallyVisible: function(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < windowHeight &&
      rect.left < windowWidth
    );
  },

  // 格式化数字
  formatNumber: function(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  // 动画计数器
  animateCounter: function(element, start, end, duration) {
    if (!element) return;

    const range = end - start;
    const minTimer = 50;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = Math.max(stepTime, minTimer);
    const startTime = Date.now();

    const counter = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const current = Math.round(start + range * progress);
        element.textContent = this.formatNumber(current);
      } else {
        element.textContent = this.formatNumber(end);
        clearInterval(counter);
      }
    }, timer);
  }
};

// 性能优化
function initializePerformanceOptimizations() {
  // 懒加载图片
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // 预加载关键资源
  const criticalAssets = [
    'styles/main.css',
    'styles/components.css',
    'scripts/navigation.js'
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset;
    link.as = asset.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });

  console.log('⚡ 性能优化初始化完成');
}

// 错误处理
window.addEventListener('error', function(e) {
  console.error('❌ JavaScript错误:', e.error);
  // 可以在这里添加错误上报逻辑
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('❌ Promise错误:', e.reason);
  // 可以在这里添加Promise错误处理逻辑
});

// 初始化滚动效果
function initializeScrollEffects() {
  // 这个函数将在animations.js中实现
  if (typeof triggerScrollAnimations === 'function') {
    triggerScrollAnimations();
  }
  console.log('✅ 滚动效果初始化完成');
}

// 导出全局函数供HTML调用
window.navigateToSection = function(sectionId) {
  if (typeof updateActiveSection === 'function') {
    updateActiveSection(sectionId);
  }
};

console.log('✅ main.js 加载完成');