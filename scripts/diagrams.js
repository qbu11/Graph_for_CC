/*
 * 图表管理 - diagrams.js
 * 处理Mermaid图表的初始化和渲染
 */

// Mermaid配置
const mermaidConfig = {
  startOnLoad: false,
  theme: 'default',
  themeVariables: {
    primaryColor: '#667eea',
    primaryTextColor: '#2d3748',
    primaryBorderColor: '#4a5568',
    lineColor: '#667eea',
    secondaryColor: '#f7fafc',
    tertiaryColor: '#e2e8f0',
    background: '#ffffff',
    mainBkg: '#ffffff',
    secondBkg: '#f8f9fa'
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'linear'
  },
  gantt: {
    fontSize: 13,
    sectionFontSize: 15,
    numberSectionStyles: 6,
    barHeight: 45,
    barGap: 12,
    topPadding: 60,
    leftPadding: 200,
    gridLineStartPadding: 15,
    useWidth: 2400
  }
};

// 图表定义
const diagramDefinitions = {
  architecture: `
graph TB
    subgraph "输入层 Input Layer"
        A1[问题分析模式<br/>项目名 + 创始人问题]
    end

    subgraph "6阶段思维链 COT Pipeline"
        B1[Stage 1<br/>意图识别与问题拆解<br/>🔍 5W2H分析<br/>📋 原子问题拆解]
        B2[Stage 2<br/>智能框架映射<br/>🎯 7框架智能匹配<br/>⚖️ 动态权重调整]
        B3[Stage 3<br/>统一信息检索<br/>⚡ 并行执行<br/>📊 多源数据整合]
        B4[Stage 4<br/>分析构建<br/>🧠 OH1+QI会议分析<br/>📈 深层原因分析]
        B5[Stage 5<br/>智能输出生成<br/>📝 3角度建议<br/>✅ 可执行路径]
        B6[Stage 6<br/>报告文档保存<br/>💾 自动存档<br/>📄 MD格式]
    end

    subgraph "信息层级结构 Information Hierarchy"
        C1[申请表<br/>Apply]
        C2[创业营项目<br/>Incubation]
        C3[OH1/QI会议记录<br/>Meeting Records]
        C4[顶层方法论<br/>Frameworks]
        C5[历史案例<br/>Cases]
    end

    subgraph "7大分析框架 Analysis Frameworks"
        D1[产品PMF]
        D2[融资]
        D3[团队]
        D4[GTM市场]
        D5[技术架构]
        D6[运营管理]
        D7[财务法务]
    end

    subgraph "工具集成层 Tool Integration"
        E1[MCP实时数据<br/>🔄 get_company_info<br/>🔄 get_company_tasks]
        E2[文件检索<br/>📁 Glob/Grep/Read<br/>⚡ 并行执行]
        E3[WebFetch<br/>🌐 实时信息获取]
    end

    subgraph "输出层 Output Layer"
        F1[问题分析输出<br/>📍 OH1会议总结<br/>🎙️ QI核心意见<br/>📋 3角度建议选择]
        F3[自动存档<br/>📄 MD文档<br/>🕐 时间戳命名]
    end

    %% 连接线
    A1 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B4 --> B5
    B5 --> B6

    B2 -.-> D1
    B2 -.-> D2
    B2 -.-> D3
    B2 -.-> D4
    B2 -.-> D5
    B2 -.-> D6
    B2 -.-> D7

    B3 --> E1
    B3 --> E2
    B3 --> E3

    E2 --> C1
    E2 --> C2
    E2 --> C3
    E2 --> C4
    E2 --> C5

    B5 --> F1
    B6 --> F3

    %% 样式
    classDef inputBox fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef stageBox fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef dataBox fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef frameworkBox fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef toolBox fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef outputBox fill:#e0f2f1,stroke:#004d40,stroke-width:2px

    class A1,A2 inputBox
    class B1,B2,B3,B4,B5,B6 stageBox
    class C1,C2,C3,C4,C5 dataBox
    class D1,D2,D3,D4,D5,D6,D7 frameworkBox
    class E1,E2,E3 toolBox
    class F1,F2,F3 outputBox
  `,

  performance: `
gantt
    title 6阶段执行时序图 (总时长<3分钟)
    dateFormat X
    axisFormat %s

    section Stage 1
    意图识别与问题拆解: 5W2H分析 + 原子问题拆解        :s1, 0, 60s
    section Stage 2
    智能框架映射: 7框架智能匹配 + 动态权重调整        :s2, after s1, 50s
    section Stage 3
    统一信息检索: 并行执行 + 多源数据整合        :s3, after s2, 120s
    section Stage 4
    分析构建: OH1+QI会议分析 + 深层原因分析        :s4, after s3, 50s
    section Stage 5
    智能输出生成: 3角度建议 + 可执行路径        :s5, after s4, 40s
    section Stage 6
    报告文档保存: 自动存档 + MD格式        :s6, after s5, 30s
  `,

  algorithm: `
flowchart TD
    A[问题输入] --> B[关键词提取]
    B --> C[基础评分]
    C --> D[项目阶段识别]
    D --> E[紧急度评估]
    E --> F[动态权重调整]
    F --> G{匹配度判断}

    G -->|单框架领先| H[直接采用<br/>confidence=高]
    G -->|多框架竞争| I[主辅框架模式<br/>confidence=中等]
    G -->|权重分散| J[平衡分析模式<br/>建议分别分析]
    G -->|无明显匹配| K[请求澄清<br/>提供选择菜单]

    style A fill:#e3f2fd
    style G fill:#fff3e0
    style H fill:#e8f5e8
    style I fill:#e8f5e8
    style J fill:#fff9c4
    style K fill:#ffebee
  `,

  retrieval: `
graph LR
    subgraph "数据源层"
        A1[申请表<br/>基础信息]
        A2[创业营<br/>项目详情]
        A3[OH1记录<br/>会议纪要]
        A4[方法论<br/>框架知识]
        A5[案例库<br/>成功经验]
    end

    subgraph "检索引擎"
        B1[Glob<br/>文件定位]
        B2[Grep<br/>内容搜索]
        B3[Read<br/>文档读取]
        B4[MCP<br/>实时数据]
    end

    subgraph "并行处理"
        C1[基础信息<br/>检索组1-2]
        C2[问题证据<br/>检索组3-6]
        C3[GOH评估<br/>检索组7-10]
    end

    A1 --> B1
    A2 --> B2
    A3 --> B3
    A4 --> B4
    A5 --> B4

    B1 --> C1
    B2 --> C2
    B3 --> C3
    B4 --> C1
  `
};

// 初始化图表系统
function initializeDiagrams() {
  if (typeof mermaid === 'undefined') {
    console.error('❌ Mermaid未加载');
    return;
  }

  // 初始化Mermaid
  mermaid.initialize(mermaidConfig);

  console.log('✅ 图表系统初始化完成');
}

// 渲染特定图表
function renderDiagram(diagramId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ 找不到容器: ${containerId}`);
    return;
  }

  const definition = diagramDefinitions[diagramId];
  if (!definition) {
    console.error(`❌ 找不到图表定义: ${diagramId}`);
    return;
  }

  try {
    // 清空容器
    container.innerHTML = '';

    // 创建临时div
    const tempDiv = document.createElement('div');
    tempDiv.className = 'mermaid';
    tempDiv.textContent = definition;
    container.appendChild(tempDiv);

    // 渲染图表
    mermaid.init(undefined, tempDiv);

    console.log(`✅ 图表渲染完成: ${diagramId}`);
  } catch (error) {
    console.error(`❌ 图表渲染失败: ${diagramId}`, error);
    container.innerHTML = `<p style="text-align: center; color: #ef4444; padding: 20px;">图表加载失败</p>`;
  }
}

// 初始化架构图
function initializeArchitectureDiagram() {
  setTimeout(() => {
    renderDiagram('architecture', 'architectureDiagram');
  }, 100);
}

// 初始化性能图
function initializePerformanceDiagram() {
  setTimeout(() => {
    renderDiagram('performance', 'performanceDiagram');
  }, 100);
}

// 初始化算法图
function initializeAlgorithmDiagram() {
  setTimeout(() => {
    renderDiagram('algorithm', 'algorithmDiagram');
  }, 100);
}

// 初始化检索图
function initializeRetrievalDiagram() {
  setTimeout(() => {
    renderDiagram('retrieval', 'retrievalDiagram');
  }, 100);
}

// 重新渲染所有图表
function rerenderAllDiagrams() {
  Object.keys(diagramDefinitions).forEach(diagramId => {
    const containerId = diagramId + 'Diagram';
    renderDiagram(diagramId, containerId);
  });
}

// 处理窗口大小变化
function handleDiagramResize() {
  // 延迟重新渲染，避免频繁调用
  clearTimeout(window.diagramResizeTimeout);
  window.diagramResizeTimeout = setTimeout(() => {
    rerenderAllDiagrams();
  }, 500);
}

// 监听窗口大小变化
window.addEventListener('resize', handleDiagramResize);

// 图表放大功能
function enlargeDiagram(diagramId) {
  const originalDiagram = document.getElementById(diagramId);
  const modal = document.getElementById('diagramModal');
  const modalContent = document.getElementById('modalDiagramContent');

  if (!originalDiagram || !modal || !modalContent) {
    console.error('放大图表失败：找不到必要的元素');
    return;
  }

  try {
    // 清空模态框内容
    modalContent.innerHTML = '';

    // 获取图表定义
    const diagramType = diagramId.replace('Diagram', '');
    const definition = diagramDefinitions[diagramType];

    if (!definition) {
      console.error(`找不到图表定义: ${diagramType}`);
      return;
    }

    // 为特定图表类型添加CSS类
    modal.classList.remove('architecture-diagram', 'retrieval-diagram', 'algorithm-diagram');
    if (diagramType === 'architecture') {
      modal.classList.add('architecture-diagram');
    } else if (diagramType === 'retrieval') {
      modal.classList.add('retrieval-diagram');
    } else if (diagramType === 'algorithm') {
      modal.classList.add('algorithm-diagram');
    }

    // 创建新的图表元素
    const newDiagram = document.createElement('div');
    newDiagram.className = 'mermaid';
    newDiagram.textContent = definition;

    modalContent.appendChild(newDiagram);

    // 显示模态框
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动

    // 渲染图表
    mermaid.init(undefined, newDiagram);

    console.log(`✅ 图表放大成功: ${diagramType}`);
  } catch (error) {
    console.error(`❌ 图表放大失败: ${diagramType}`, error);
  }
}

// 关闭图表模态框
function closeDiagramModal() {
  const modal = document.getElementById('diagramModal');
  const modalContent = document.getElementById('modalDiagramContent');

  if (modal) {
    modal.classList.remove('active', 'architecture-diagram', 'retrieval-diagram', 'algorithm-diagram'); // 清理所有CSS类
    document.body.style.overflow = ''; // 恢复背景滚动
  }

  if (modalContent) {
    modalContent.innerHTML = ''; // 清空内容，释放内存
  }

  console.log('✅ 图表模态框已关闭');
}

// 点击模态框背景关闭
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('diagramModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeDiagramModal();
      }
    });
  }

  // ESC键关闭模态框
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDiagramModal();
    }
  });
});

// 使函数全局可用
window.enlargeDiagram = enlargeDiagram;
window.closeDiagramModal = closeDiagramModal;

console.log('✅ diagrams.js 加载完成');