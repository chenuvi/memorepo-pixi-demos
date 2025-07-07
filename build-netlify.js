const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// 构建配置
const config = {
  mainApp: {
    path: path.join(rootDir, 'mainApp'),
    distDir: 'dist'
  },
  subProjects: [
    {
      name: 'fish-pond',
      path: path.join(rootDir, 'apps', 'fish-pond'),
      distDir: 'dist'
    },
    {
      name: 'choo-choo-train',
      path: path.join(rootDir, 'apps', 'choo-choo-train'),
      distDir: 'dist'
    },
    {
      name: 'spine-boy-adventure',
      path: path.join(rootDir, 'apps', 'spine-boy-adventure'),
      distDir: 'dist'
    }
  ]
};

// 确保目录存在
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 复制目录
function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('开始构建所有项目...');

// 先构建主应用
console.log('构建主应用...');
try {
  execSync('pnpm build', { stdio: 'inherit', cwd: config.mainApp.path });
  console.log('主应用构建成功!');
} catch (error) {
  console.error('构建主应用失败:', error);
  process.exit(1);
}

// 构建并复制子项目
for (const project of config.subProjects) {
  console.log(`构建子项目: ${project.name}`);
  try {
    // 用绝对路径执行构建
    execSync('pnpm build', { stdio: 'inherit', cwd: project.path });

    // 将构建结果复制到主应用的公共目录
    const srcDir = path.join(project.path, project.distDir);
    const destDir = path.join(config.mainApp.path, config.mainApp.distDir, project.name.replace(/-/g, '_'));

    console.log(`复制 ${srcDir} 到 ${destDir}`);
    ensureDir(destDir);
    copyDir(srcDir, destDir);
  } catch (error) {
    console.error(`构建 ${project.name} 失败:`, error);
    process.exit(1);
  }
}

console.log('所有项目构建完成!'); 