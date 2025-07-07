import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './ProjectPage.module.css'

// 定义项目信息
const projectsInfo: Record<string, {
  name: string;
  description: string;
  githubLink?: string;
  devPort: number;
}> = {
  'fish-pond': {
    name: '鱼塘',
    description: '一个使用 Pixi.js 构建的交互式鱼塘模拟器，展示了水波纹动画和鱼群行为模拟。通过位移滤镜和精灵动画，创建了一个生动的水下场景。',
    devPort: 5173
  },
  'choo-choo-train': {
    name: '火车',
    description: '使用 Pixi.js 制作的动态火车动画。演示了如何使用精灵动画和变换来创建移动的火车效果。',
    devPort: 5174
  },
  'spine-boy-adventure': {
    name: 'Spine 动画',
    description: '使用 Pixi.js 和 Spine 动画库创建的角色动画演示。展示了如何在 Pixi.js 中集成和控制复杂的骨骼动画。',
    devPort: 5175
  }
};

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [environments, setEnvironments] = useState({
    dev: false,
    prod: false
  })
  
  const projectInfo = projectId && projectsInfo[projectId]
  
  // 检查环境是否可用
  useEffect(() => {
    const checkEnvironments = async () => {
      if (!projectId) return
      
      // 在实际项目中，你可能需要根据网络状况进行真实检查
      // 这里我们假设开发环境和生产环境都可用
      setEnvironments({
        dev: true,
        prod: true
      })
    }
    
    checkEnvironments()
  }, [projectId])
  
  if (!projectId || !projectInfo) {
    return (
      <div className={styles.container}>
        <h1>项目不存在</h1>
        <p>找不到请求的项目。</p>
        <Link to="/" className={styles.button}>返回首页</Link>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <h1>{projectInfo.name}</h1>
      <p className={styles.description}>{projectInfo.description}</p>
      
      <div className={styles.actions}>
        <h2>项目环境</h2>
        <div className={styles.buttons}>
          {environments.dev && (
            <a 
              href={`http://localhost:${projectInfo.devPort}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.button}
            >
              在开发环境中查看
            </a>
          )}
          {environments.prod && (
            <a 
              href={`/${projectId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.button}
            >
              在生产环境中查看
            </a>
          )}
          <button 
            onClick={() => {
              const iframe = document.getElementById('previewFrame') as HTMLIFrameElement | null
              if (iframe) {
                iframe.src = `/${projectId}`
              }
            }}
            className={styles.button}
          >
            在当前页面预览
          </button>
        </div>
      </div>
      
      <div className={styles.preview}>
        <h2>预览</h2>
        <iframe 
          id="previewFrame"
          title={`${projectInfo.name} 预览`}
          className={styles.iframe}
          src={`/${projectId}`}
        ></iframe>
      </div>
    </div>
  )
}

export default ProjectPage 