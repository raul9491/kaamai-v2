import styles from './PaywallModal.module.css'

export default function PaywallModal({ module: mod, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.icon}>{mod.icon}</div>
        <h2 className={styles.title}>
          Aapke 3 free tries<br />khatam ho gaye
        </h2>
        <p className={styles.sub}>
          Continue with <strong>{mod.name}</strong> for just ₹{mod.price}/month —
          unlimited documents, single device.
        </p>
        <div className={styles.priceBlock}>
          <span className={styles.priceAmount}>₹{mod.price}</span>
          <span className={styles.pricePer}>/month</span>
        </div>
        <ul className={styles.benefits}>
          <li>✓ Unlimited documents</li>
          <li>✓ All {mod.tasks.length} task types included</li>
          <li>✓ Hindi + English output</li>
          <li>✓ Cancel anytime</li>
        </ul>
        <button className={styles.ctaBtn}>
          Pay ₹{mod.price}/month — Start Now
        </button>
        <p className={styles.note}>
          Need all 6 modules? ₹199/month —{' '}
          <a href="#">upgrade to all-access</a>
        </p>
        <button className={styles.closeBtn} onClick={onClose}>
          Maybe later
        </button>
      </div>
    </div>
  )
}
