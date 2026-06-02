const FREE_LIMIT = 3
const STORAGE_KEY = 'kaamai_usage'

export function getUsage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function getModuleUsage(moduleId) {
  const usage = getUsage()
  return usage[moduleId] || 0
}

export function incrementUsage(moduleId) {
  const usage = getUsage()
  usage[moduleId] = (usage[moduleId] || 0) + 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage))
  return usage[moduleId]
}

export function canUseModule(moduleId) {
  return getModuleUsage(moduleId) < FREE_LIMIT
}

export function getRemainingFree(moduleId) {
  return Math.max(0, FREE_LIMIT - getModuleUsage(moduleId))
}

export function isPaid(moduleId) {
  try {
    const paid = JSON.parse(localStorage.getItem('kaamai_paid') || '{}')
    return paid[moduleId] === true || paid['all'] === true
  } catch {
    return false
  }
}

export function hasAccess(moduleId) {
  return isPaid(moduleId) || canUseModule(moduleId)
}
