# Pixi.js Demos Monorepo

基于 Pixi.js 和 pnpm workspaces 的 WebGL 动画演示项目集合，包含多个交互式图形应用和统一项目首页。

## 项目概述

- **技术栈**：Pixi.js 8+, TypeScript, Vite, pnpm workspaces
- **应用数量**：3 个独立演示项目
- **构建工具**：Vite
- **部署支持**：Nginx

## 项目结构

```
memorepo-pixi-demos/
├── apps/                # 应用目录
│   ├── fish-pond/       # 鱼塘应用
│   ├── choo-choo-train/ # 火车应用
│   └── spine-boy-adventure/ # Spine动画应用
├── packages/            # 共享包
│   ├── components/      # 共享组件
│   └── shared/          # 共享工具和依赖
└──  build-all.js        # 构建脚本
```

## 本地开发

1. 安装依赖：
```bash
pnpm install
```

2. 开发特定应用：
```bash
cd apps/fish-pond
pnpm dev
```

## 构建所有应用

```bash
pnpm build:all
```

构建后的文件会输出到根目录的`dist`文件夹中，每个应用的输出位于对应的子目录。

## 添加新应用

1. 在`apps`目录下创建新目录
2. 在新目录中初始化应用
3. 创建`vite.config.js`，设置正确的`base`路径
4. 重新构建和部署 


## 项目 Nginx 快捷命令
```nginx
// 测试配置是否有语法错误：
sudo nginx -t
// 更新 nginx 配置文件
 sudo cp /home/codes/webgl/memorepo-pixi-demos/nginx.conf /etc/nginx/conf.d/memorepo-pixi-demos.conf
// 重启 nginx
sudo systemctl restart nginx
```