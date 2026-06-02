import { useNavigate } from 'react-router-dom'
import { MODULES, MODULE_ORDER } from '../config/modules.js'
import { getRemainingFree } from '../utils/freeTier.js'
import styles from './Home.module.css'

const MODULE_NUMS = ['01', '02', '03', '04', '05', '06']

export default function Home() {
  const navigate = useNavigate()

  console.log('🏠 Home component rendering...')
  console.log('MODULES:', MODULES)
  console.log('MODULE_ORDER:', MODULE_ORDER)

  return (
    <main className={styles.main}>

      {/* Ambient glow */}
      <div className={styles.glow} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>India ka apna AI platform</span>
          <span className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.headline}>
          Professional work,<br />
          done in <em className={styles.gold}>sixty seconds.</em>
        </h1>

        <p className={styles.subline}>
          Expert AI tools built specifically for Indian professionals —<br className={styles.brDesk} />
          in Hindi, English, or Hinglish.
        </p>

        <p className={styles.hindi}>"Aapka kaam, AI ke saath."</p>

        <div className={styles.pills}>
          <span className={styles.pill}><strong>₹49–99</strong> / month</span>
          <span className={styles.pill}><strong>3 free</strong> tries — no login</span>
          <span className={styles.pill}>Hindi + English output</span>
          <span className={styles.pill}>Works on any phone</span>
        </div>
      </section>

      {/* Section divider */}
      <div className={styles.divider}>
        <span className={styles.divLine} />
        <span className={styles.divText}>Choose your profession</span>
        <span className={styles.divLine} />
      </div>

      {/* Module grid */}
      <section className={styles.gridWrap} id="modules">
        <div className={styles.grid}>
          {MODULE_ORDER.map((id, idx) => {
            const mod = MODULES[id]
            const remaining = getRemainingFree(id)
            return (
              <div
                key={id}
                className={styles.tile}
                style={{
                  '--ac': `var(--${id})`,
                  '--ac-dim': `var(--${id}-dim)`,
                  animationDelay: `${0.05 + idx * 0.05}s`
                }}
                onClick={() => navigate(`/module/${id}`)}
              >
                <div className={styles.tileCorner} />
                <div className={styles.tileNum}>{MODULE_NUMS[idx]}</div>
                <div className={styles.tileIcon}>{mod.icon}</div>
                <div className={styles.tileName}>{mod.name}</div>
                <div className={styles.tileSub}>{mod.hindi}</div>
                <ul className={styles.tileTasks}>
                  {mod.tasks.map(t => (
                    <li key={t.id}>{t.label}</li>
                  ))}
                </ul>
                <div className={styles.tileFooter}>
                  <span className={styles.tilePrice}>₹{mod.price} / month</span>
                  {remaining > 0
                    ? <span className={styles.tileBadge}>{remaining} FREE LEFT</span>
                    : <span className={styles.tileBadgeUsed}>UPGRADE</span>
                  }
                  <span className={styles.tileArrow}>↗</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.howItWorks} id="how-it-works">
        <h2 className={styles.sectionTitle}>How it works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>01</div>
            <h3 className={styles.stepTitle}>Choose your profession</h3>
            <p className={styles.stepText}>Pick from 6 modules: CA, Advocate, Student, Kirana, Doctor, Freelancer</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>02</div>
            <h3 className={styles.stepTitle}>Fill a simple form</h3>
            <p className={styles.stepText}>No chatting — just fill in the details. In Hindi, English, or Hinglish.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>03</div>
            <h3 className={styles.stepTitle}>Get professional output</h3>
            <p className={styles.stepText}>AI generates your document in 60 seconds. Copy, edit, or download.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricing} id="pricing">
        <h2 className={styles.sectionTitle}>Simple pricing</h2>
        <p className={styles.sectionSubtitle}>Start free. Upgrade when ready. Cancel anytime.</p>

        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3 className={styles.pricingTitle}>Free</h3>
              <div className={styles.pricingAmount}>₹0</div>
              <div className={styles.pricingPer}>forever</div>
            </div>
            <ul className={styles.pricingFeatures}>
              <li>✓ 3 free tries per module</li>
              <li>✓ All 6 modules</li>
              <li>✓ Hindi + English</li>
              <li>✓ No login required</li>
              <li>✗ No document upload</li>
            </ul>
          </div>

          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3 className={styles.pricingTitle}>Single Module</h3>
              <div className={styles.pricingAmount}>₹49-99</div>
              <div className={styles.pricingPer}>per month</div>
            </div>
            <ul className={styles.pricingFeatures}>
              <li>✓ Unlimited uses</li>
              <li>✓ One module of your choice</li>
              <li>✓ Hindi + English</li>
              <li>✓ Priority support</li>
              <li>✓ Document upload (coming soon)</li>
            </ul>
          </div>

          <div className={`${styles.pricingCard} ${styles.popular}`}>
            <div className={styles.popularBadge}>Most Popular</div>
            <div className={styles.pricingHeader}>
              <h3 className={styles.pricingTitle}>All Modules</h3>
              <div className={styles.pricingAmount}>₹199</div>
              <div className={styles.pricingPer}>per month</div>
            </div>
            <ul className={styles.pricingFeatures}>
              <li>✓ Unlimited uses</li>
              <li>✓ All 6 modules</li>
              <li>✓ Hindi + English</li>
              <li>✓ Priority support</li>
              <li>✓ Document upload (coming soon)</li>
              <li>✓ Early access to new features</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className={styles.roadmap}>
        <h2 className={styles.sectionTitle}>Coming soon</h2>
        <div className={styles.roadmapGrid}>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapIcon}>📄</div>
            <h3 className={styles.roadmapTitle}>Document Upload</h3>
            <p className={styles.roadmapText}>Upload PDFs, images, notices directly. No more copy-paste.</p>
            <span className={styles.roadmapEta}>Week 3-4</span>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapIcon}>💬</div>
            <h3 className={styles.roadmapTitle}>Chat with AI</h3>
            <p className={styles.roadmapText}>Ask follow-up questions and refine your documents.</p>
            <span className={styles.roadmapEta}>Month 2</span>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapIcon}>📱</div>
            <h3 className={styles.roadmapTitle}>Mobile App</h3>
            <p className={styles.roadmapText}>Native Android & iOS apps for on-the-go work.</p>
            <span className={styles.roadmapEta}>Month 3</span>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapIcon}>🎁</div>
            <h3 className={styles.roadmapTitle}>Referral Program</h3>
            <p className={styles.roadmapText}>Get 1 free month for every paying referral.</p>
            <span className={styles.roadmapEta}>Month 2</span>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <footer className={styles.trust}>
        <div className={styles.trustItems}>
          {['No data stored', 'Works on any phone', 'Built for India', 'Hindi + English', 'Results in 60 seconds'].map(t => (
            <div key={t} className={styles.trustItem}>
              <span className={styles.trustDot} />
              {t}
            </div>
          ))}
        </div>
        <span className={styles.trustCta}>Start free — no card needed.</span>
      </footer>

      {/* Transparency Footer */}
      <div className={styles.aiDisclaimer}>
        <p>Powered by Claude AI from Anthropic. Platform built in India for Indian professionals.</p>
      </div>

    </main>
  )
}
