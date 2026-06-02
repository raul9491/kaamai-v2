import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MODULES } from '../config/modules.js'
import { hasAccess, incrementUsage, getRemainingFree, isPaid } from '../utils/freeTier.js'
import PaywallModal from '../components/PaywallModal.jsx'
import styles from './ModulePage.module.css'

export default function ModulePage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const mod = MODULES[moduleId]

  const [selectedTask, setSelectedTask] = useState(null)
  const [formData, setFormData] = useState({})
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPaywall, setShowPaywall] = useState(false)

  if (!mod) {
    return (
      <div className={styles.notFound}>
        <p>Module not found.</p>
        <button onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    )
  }

  const fields = selectedTask ? mod.fields[selectedTask] : []
  const remaining = getRemainingFree(moduleId)
  const paid = isPaid(moduleId)

  function handleTaskSelect(taskId) {
    setSelectedTask(taskId)
    setFormData({})
    setResult('')
    setError('')
  }

  function handleFieldChange(fieldId, value) {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
  }

  async function handleSubmit() {
    if (!hasAccess(moduleId)) {
      setShowPaywall(true)
      return
    }

    const task = mod.tasks.find(t => t.id === selectedTask)
    const requiredFields = fields.filter(f => f.required)
    const missing = requiredFields.filter(f => !formData[f.id]?.trim())
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.map(f => f.label).join(', ')}`)
      return
    }

    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, taskId: selectedTask, formData })
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Something went wrong')
      }

      const data = await response.json()
      setResult(data.result)

      if (!paid) {
        const newCount = incrementUsage(moduleId)
        if (newCount >= 3) {
          // Will show paywall on next attempt
        }
      }
    } catch (err) {
      setError(err.message || 'Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result)
      .then(() => alert('Copied to clipboard!'))
      .catch(() => alert('Please select and copy manually.'))
  }

  return (
    <main className={styles.main}>
      {showPaywall && (
        <PaywallModal module={mod} onClose={() => setShowPaywall(false)} />
      )}

      <div className={styles.header} style={{ '--ac': `var(--${moduleId})`, '--ac-dim': `var(--${moduleId}-dim)` }}>
        <button className={styles.back} onClick={() => navigate('/')}>← Back</button>
        <div className={styles.headerInner}>
          <span className={styles.headerIcon}>{mod.icon}</span>
          <div>
            <h1 className={styles.headerName}>{mod.name}</h1>
            <p className={styles.headerHindi}>{mod.hindi}</p>
          </div>
        </div>
        {!paid && (
          <div className={styles.freeBar}>
            {remaining > 0
              ? <span className={styles.freeRemaining}>{remaining} free {remaining === 1 ? 'use' : 'uses'} remaining</span>
              : <span className={styles.freeGone}>Free uses finished — <a href="#" onClick={() => setShowPaywall(true)}>upgrade for ₹{mod.price}/month</a></span>
            }
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.taskGrid}>
          {mod.tasks.map(task => (
            <button
              key={task.id}
              className={`${styles.taskBtn} ${selectedTask === task.id ? styles.taskBtnActive : ''}`}
              style={{ '--ac': `var(--${moduleId})`, '--ac-dim': `var(--${moduleId}-dim)` }}
              onClick={() => handleTaskSelect(task.id)}
            >
              <span className={styles.taskLabel}>{task.label}</span>
              {task.hindi && <span className={styles.taskHindi}>{task.hindi}</span>}
            </button>
          ))}
        </div>

        {selectedTask && (
          <div className={styles.formSection}>
            <div className={styles.form}>
              {fields.map(field => (
                <div key={field.id} className={styles.field}>
                  <label className={styles.label}>
                    {field.label}
                    {field.hindi && <span className={styles.labelHindi}> — {field.hindi}</span>}
                    {field.required && <span className={styles.required}> *</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      value={formData[field.id] || ''}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.id] || ''}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                    >
                      <option value="">Select...</option>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      value={formData[field.id] || ''}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}

              {error && <p className={styles.error}>{error}</p>}

              <button
                className={styles.generateBtn}
                style={{ background: `var(--${moduleId})` }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Generating...' : !hasAccess(moduleId) ? '🔒 Upgrade to Continue' : '⚡ Generate'}
              </button>
            </div>

            {loading && (
              <div className={styles.loadingCard}>
                <div className={styles.spinner} style={{ borderTopColor: mod.color }} />
                <p>AI kaam kar raha hai...</p>
              </div>
            )}

            {result && (
              <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                  <span className={styles.resultTitle}>Your Result</span>
                  <div className={styles.resultActions}>
                    <button className={styles.copyBtn} onClick={handleCopy}>📋 Copy</button>
                    <button className={styles.newBtn} onClick={() => setResult('')}>New →</button>
                  </div>
                </div>
                <div className={styles.resultBody}>
                  {result.split('\n').map((line, i) => (
                    <p key={i} className={line === '' ? styles.resultBlank : styles.resultLine}>
                      {line || '\u00A0'}
                    </p>
                  ))}
                </div>
                {!paid && remaining <= 1 && (
                  <div className={styles.upgradeNudge}>
                    <span>Liked this? Get unlimited for ₹{mod.price}/month</span>
                    <button onClick={() => setShowPaywall(true)}>Upgrade →</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!selectedTask && (
          <div className={styles.selectPrompt}>
            <p>👆 Select a task above to get started</p>
            <p className={styles.selectSub}>3 free tries — no login needed</p>
          </div>
        )}
      </div>
    </main>
  )
}
