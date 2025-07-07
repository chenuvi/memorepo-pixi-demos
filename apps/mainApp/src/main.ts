import { Project } from './types';

// 判断当前环境
const isProd = import.meta.env.PROD;

// 各子项目开发端口
const devPorts: Record<string, number> = {
  'fish-pond': 5173,
  'choo-choo-train': 5174,
  'spine-boy-adventure': 5175
};

// 项目数据和路径配置
const projects: Project[] = [
  {
    id: 'fish-pond',
    name: '鱼池',
    description: '一个使用 PixiJS 创建的互动鱼池场景，展示了水波纹和鱼游动的效果。',
    path: isProd ? '/fish_pond/' : 'http://localhost:5173/',
    imageUrl: '/assets/fish-pond.png'
  },
  {
    id: 'choo-choo-train',
    name: '小火车',
    description: '一个使用 PixiJS 制作的小火车动画，展示了基础的动画和交互功能。',
    path: isProd ? '/choo_choo_train/' : 'http://localhost:5174/',
    imageUrl: '/assets/choo-choo-train.png'
  },
  {
    id: 'spine-boy-adventure',
    name: 'Spine 骨骼动画冒险',
    description: '使用 PixiJS 和 Spine 骨骼动画系统创建的角色动画演示。',
    path: isProd ? '/spine_boy_adventure/' : 'http://localhost:5175/',
    imageUrl: '/assets/spine-boy-adventure.png'
  }
];

// 渲染项目卡片
function renderProjects() {
  const projectsContainer = document.getElementById('projects-grid');
  
  if (!projectsContainer) {
    console.error('找不到项目容器元素');
    return;
  }
  
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // 只用本地图片，不再用 placeholder
    const imageUrl = project.imageUrl;
    
    card.innerHTML = `
      <div class="project-image">
        <img src="${imageUrl}" alt="${project.name}">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.name}</h3>
        <p class="project-description">${project.description}</p>
        <a href="${project.path}" class="project-link" target="_blank">查看演示</a>
      </div>
    `;
    
    projectsContainer.appendChild(card);
  });
}

// 当 DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
}); 