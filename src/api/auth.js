import { http } from './http'

export async function login({ email, password }) {
  const { data } = await http.post('/auth/login', { email, password })
  return data
}

export async function register(payload) {
  const { data } = await http.post('/auth/register', payload)
  return data
}

export async function getUsers() {
  const { data } = await http.get('/auth/users')
  return data
}

export function setAuthSession({ token, user }) {
  if (token) localStorage.setItem('authToken', token)
  if (user) localStorage.setItem('authUser', JSON.stringify(user))
}

export function clearAuthSession() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('authUser')
}

export function getAuthUser() {
  const raw = localStorage.getItem('authUser')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

