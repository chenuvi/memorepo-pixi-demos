import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>Pixi.js 演示项目 &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default Layout 