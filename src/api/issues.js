import { http } from './http'

export async function listIssues() {
  const { data } = await http.get('/issues')
  return data
}

export async function createIssue(payload) {
  const { data } = await http.post('/issues', payload)
  return data
}

export async function updateIssue(id, payload) {
  const { data } = await http.put(`/issues/${id}`, payload)
  return data
}

