# Pixi.js Demos Monorepo

这个项目是一个基于pnpm workspaces的monorepo，包含多个Pixi.js示例应用。

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
├── build-all.js         # Linux/MacOS构建脚本
├── build-all-win.js     # Windows构建脚本
└── netlify.toml         # Netlify配置
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
# Windows
pnpm build

# Linux/MacOS
pnpm build:linux
```

构建后的文件会输出到根目录的`dist`文件夹中，每个应用的输出位于对应的子目录。

## Netlify部署

项目已配置为在Netlify上一次性部署所有应用。

### 部署步骤

1. 在Netlify创建新站点
2. 连接到GitHub仓库
3. 使用以下设置：
   - 构建命令：已在netlify.toml中配置
   - 发布目录：已在netlify.toml中配置

部署后，可通过以下路径访问各应用：

- 主页：`https://your-netlify-site.netlify.app/`
- 鱼塘应用：`https://your-netlify-site.netlify.app/fish-pond/`
- 火车应用：`https://your-netlify-site.netlify.app/choo-choo-train/`
- Spine动画应用：`https://your-netlify-site.netlify.app/spine-boy-adventure/`

## 添加新应用

1. 在`apps`目录下创建新目录
2. 在新目录中初始化应用
3. 创建`vite.config.js`，设置正确的`base`路径
4. 重新构建和部署 