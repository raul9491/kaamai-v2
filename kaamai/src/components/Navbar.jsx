import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        Kaam<em>AI</em>
      </Link>
      <div className={styles.right}>
        <button onClick={() => scrollToSection('how-it-works')} className={styles.navLink}>How it works</button>
        <button onClick={() => scrollToSection('pricing')} className={styles.navLink}>Pricing</button>
        <button onClick={() => scrollToSection('modules')} className={styles.cta}>Try Free →</button>
      </div>
    </nav>
  )
}
