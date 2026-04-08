import { http } from './http'

export async function listFeedback() {
  const { data } = await http.get('/feedback')
  return data
}

export async function getFeedbackStats() {
  const { data } = await http.get('/feedback/stats')
  return data
}

export async function createFeedback(payload) {
  const { data } = await http.post('/feedback', payload)
  return data
}

export async function deleteFeedback(id) {
  await http.delete(`/feedback/${id}`)
  return true
}
