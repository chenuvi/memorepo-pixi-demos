import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

// 定义项目列表
const projects = [
  { 
    id: 'fish-pond', 
    name: '鱼塘', 
    description: '一个交互式鱼塘演示，展示 Pixi.js 的水波纹和动画效果。',
    preview: '/fish-pond/preview.png'
  },
  { 
    id: 'choo-choo-train', 
    name: '火车', 
    description: '使用 Pixi.js 制作的动态火车动画演示。',
    preview: '/choo-choo-train/preview.png'
  },
  { 
    id: 'spine-boy-adventure', 
    name: 'Spine 动画', 
    description: '使用 Pixi.js 和 Spine 制作的角色动画演示。',
    preview: '/spine-boy-adventure/preview.png'
  }
]

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Pixi.js 演示项目</h1>
      <p className={styles.intro}>
        欢迎来到 Pixi.js 演示项目集合。这里展示了使用 Pixi.js 创建的各种交互式图形和游戏演示。
        点击下方卡片查看详细内容和预览。
      </p>
      
      <div className={styles.grid}>
        {projects.map(project => (
          <div key={project.id} className={styles.card}>
            <div className={styles.preview}>
              <img src={project.preview} alt={project.name} />
            </div>
            <div className={styles.content}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <Link to={`/project/${project.id}`} className={styles.button}>
                查看演示
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage 