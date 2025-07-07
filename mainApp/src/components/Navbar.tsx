import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

// 定义项目列表
const projects = [
  { id: 'fish-pond', name: '鱼塘' },
  { id: 'choo-choo-train', name: '火车' },
  { id: 'spine-boy-adventure', name: 'Spine动画' }
]

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Pixi.js 演示项目</Link>
      </div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>首页</Link>
        {projects.map(project => (
          <Link 
            key={project.id} 
            to={`/project/${project.id}`} 
            className={styles.link}
          >
            {project.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar 