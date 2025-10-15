/*
 * 导航功能 - navigation.js
 * 处理页面导航和路由
 */

// 导航状态
let currentSection = 'home';

// 初始化导航
function initializeNavigation() {
  // 绑定导航链接事件
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('data-target');
      if (target) {
        updateActiveSection(target);
      }
    });
  });

  // 绑定移动端菜单切换
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // 点击菜单项时关闭移动端菜单
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  console.log('✅ 导航系统初始化完成');
}

// 更新活动段落
function updateActiveSection(sectionId) {
  if (currentSection === sectionId) return;

  // 隐藏当前段落
  const currentSectionEl = document.getElementById(currentSection);
  if (currentSectionEl) {
    currentSectionEl.classList.remove('active');
  }

  // 显示新段落
  const newSectionEl = document.getElementById(sectionId);
  if (newSectionEl) {
    newSectionEl.classList.add('active');
    currentSection = sectionId;

    // 更新导航状态
    updateNavigationState(sectionId);

    // 更新URL hash
    window.location.hash = sectionId;

    // 滚动到顶部
    window.scrollTo(0, 0);

    // 触发段落特定的初始化
    initializeSectionContent(sectionId);
  }

  console.log(`📍 导航到: ${sectionId}`);
}

// 更新导航状态
function updateNavigationState(activeSection) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const target = link.getAttribute('data-target');
    if (target === activeSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 初始化段落内容
function initializeSectionContent(sectionId) {
  switch (sectionId) {
    case 'architecture':
      initializeArchitectureDiagram();
      break;
    case 'performance':
      initializePerformanceDiagram();
      break;
    case 'algorithm':
      initializeAlgorithmDiagram();
      break;
    case 'retrieval':
      initializeRetrievalDiagram();
      break;
    case 'metrics':
      initializeMetricsAnimations();
      break;
    case 'value':
      initializeValueAnimations();
      break;
  }
}

// 处理浏览器后退/前进
window.addEventListener('popstate', function(e) {
  const hash = window.location.hash.slice(1);
  if (hash && hash !== currentSection) {
    updateActiveSection(hash);
  }
});

// 初始化时检查URL hash
document.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash.slice(1);
  if (hash && ['home', 'architecture', 'performance', 'algorithm', 'retrieval', 'metrics', 'value'].includes(hash)) {
    updateActiveSection(hash);
  }
});

console.log('✅ navigation.js 加载完成');