const THEME_KEY = 'themePreference'

export function getStoredTheme() {
  return localStorage.getItem(THEME_KEY)
}

export function resolveInitialTheme() {
  const stored = getStoredTheme()
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  localStorage.setItem(THEME_KEY, theme)
}

