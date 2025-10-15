/*
 * 动画控制 - animations.js
 * 处理滚动动画和交互动画
 */

// 动画观察器
let animationObserver;

// 初始化动画系统
function initializeAnimations() {
  if (!AppState.animations.enabled) {
    console.log('🎭 动画已禁用');
    return;
  }

  // 初始化滚动动画观察器
  initializeScrollAnimationObserver();

  // 初始化数字计数动画
  initializeCounterAnimations();

  console.log('✅ 动画系统初始化完成');
}

// 初始化滚动动画观察器
function initializeScrollAnimationObserver() {
  if (!('IntersectionObserver' in window)) {
    console.log('⚠️ 浏览器不支持IntersectionObserver');
    return;
  }

  animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.add('animate');

        // 如果是数字元素，启动计数动画
        if (element.classList.contains('stat-number') || element.classList.contains('metric-value')) {
          animateNumber(element);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // 观察所有需要动画的元素
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .stat-number, .metric-value, .feature-card');
  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });
}

// 触发滚动动画
function triggerScrollAnimations() {
  const scrollElements = document.querySelectorAll('.scroll-animation');

  scrollElements.forEach(element => {
    if (Utils.isPartiallyVisible(element)) {
      element.classList.add('in-view');
    }
  });
}

// 数字动画
function animateNumber(element) {
  if (element.dataset.animated === 'true') return;

  const text = element.textContent;
  const finalNumber = parseFloat(text.replace(/[^\d.]/g, ''));

  if (isNaN(finalNumber)) return;

  element.dataset.animated = 'true';

  let current = 0;
  const increment = finalNumber / 50;
  const duration = 1500;
  const stepTime = duration / 50;

  const timer = setInterval(() => {
    current += increment;

    if (current >= finalNumber) {
      current = finalNumber;
      clearInterval(timer);
    }

    // 保持原有的格式
    if (text.includes('秒')) {
      element.textContent = `<${Math.round(current)}秒`;
    } else if (text.includes('%')) {
      element.textContent = `${Math.round(current)}%`;
    } else if (text.includes('+')) {
      element.textContent = `>${Math.round(current)}%`;
    } else {
      element.textContent = Math.round(current);
    }
  }, stepTime);
}

// 初始化计数器动画
function initializeCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (target) {
      Utils.animateCounter(counter, 0, target, 2000);
    }
  });
}

// 初始化指标动画
function initializeMetricsAnimations() {
  setTimeout(() => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.offsetHeight; // 触发重绘
        bar.style.transition = 'width 1s ease-out';
        bar.style.width = width;
      }, index * 200);
    });
  }, 500);
}

// 初始化价值动画
function initializeValueAnimations() {
  const valueCards = document.querySelectorAll('.value-card, .tech-card');
  valueCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.offsetHeight; // 触发重绘
      card.style.transition = 'all 0.6s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// 脉冲动画
function addPulseAnimation(element) {
  element.classList.add('pulse');
  setTimeout(() => {
    element.classList.remove('pulse');
  }, 2000);
}

// 震动动画
function addShakeAnimation(element) {
  element.classList.add('shake');
  setTimeout(() => {
    element.classList.remove('shake');
  }, 1000);
}

// 悬停效果增强
function enhanceHoverEffects() {
  const hoverElements = document.querySelectorAll('.feature-card, .metric-card, .value-card');

  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      if (AppState.animations.enabled) {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      }
    });

    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// 页面切换动画
function animatePageTransition(fromSection, toSection) {
  const fromEl = document.getElementById(fromSection);
  const toEl = document.getElementById(toSection);

  if (fromEl && toEl) {
    fromEl.style.opacity = '1';
    fromEl.style.transform = 'translateX(0)';

    // 退出动画
    fromEl.style.transition = 'all 0.3s ease-out';
    fromEl.style.opacity = '0';
    fromEl.style.transform = 'translateX(-50px)';

    setTimeout(() => {
      fromEl.classList.remove('active');
      toEl.classList.add('active');

      // 进入动画
      toEl.style.opacity = '0';
      toEl.style.transform = 'translateX(50px)';
      toEl.offsetHeight; // 触发重绘
      toEl.style.transition = 'all 0.3s ease-out';
      toEl.style.opacity = '1';
      toEl.style.transform = 'translateX(0)';
    }, 300);
  }
}

// 清理动画
function cleanupAnimations() {
  if (animationObserver) {
    animationObserver.disconnect();
  }
}

// 页面卸载时清理
window.addEventListener('beforeunload', cleanupAnimations);

console.log('✅ animations.js 加载完成');