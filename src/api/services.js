import { http } from './http'

export async function listServices() {
  const { data } = await http.get('/services')
  return data
}

export async function createService(payload) {
  const { data } = await http.post('/services', payload)
  return data
}

export async function updateService(id, payload) {
  const { data } = await http.put(`/services/${id}`, payload)
  return data
}

export async function deleteService(id) {
  await http.delete(`/services/${id}`)
}

