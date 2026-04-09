/** Trimmed full name: letters, spaces, apostrophe, period, hyphen; min 2 chars; must include a letter. */
export function validateFullName(value) {
  const t = String(value ?? '').trim()
  if (t.length < 2) return 'Full name must be at least 2 characters.'
  if (t.length > 80) return 'Full name must be at most 80 characters.'
  if (!/^[a-zA-ZÀ-ÿ\s'.-]+$/.test(t)) {
    return 'Full name may only contain letters, spaces, apostrophes, periods, and hyphens.'
  }
  if (!/[a-zA-ZÀ-ÿ]/.test(t)) return 'Full name must include at least one letter.'
  return null
}

/** Practical email check (not full RFC). */
export function validateEmail(value) {
  const t = String(value ?? '').trim()
  if (!t) return 'Email is required.'
  if (t.length > 254) return 'Email is too long.'
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  if (!re.test(t)) return 'Enter a valid email address.'
  return null
}

export const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p) => (p || '').length >= 8 },
  { label: 'One lowercase letter (a–z)', test: (p) => /[a-z]/.test(p || '') },
  { label: 'One uppercase letter (A–Z)', test: (p) => /[A-Z]/.test(p || '') },
  { label: 'One number (0–9)', test: (p) => /\d/.test(p || '') },
  {
    label: 'One special character (!@#$…)',
    test: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p || ''),
  },
]

export function validateRegisterPassword(password) {
  const missing = PASSWORD_RULES.filter((r) => !r.test(password))
  if (missing.length === 0) return null
  return 'Password must satisfy all requirements listed below.'
}

export function normalizeRegisterEmail(email) {
  return String(email ?? '').trim().toLowerCase()
}
