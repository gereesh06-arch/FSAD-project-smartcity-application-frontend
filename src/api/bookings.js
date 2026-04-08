import { http } from './http'

export async function listBookings() {
  try {
    const { data } = await http.get('/bookings')
    return data
  } catch (error) {
    console.warn('Backend not available, using local booking fallback')
    return []
  }
}

export async function createBooking(booking) {
  try {
    const { data } = await http.post('/bookings', booking)
    return data
  } catch (error) {
    console.warn('Backend not available, simulating booking creation')
    return {
      id: Date.now(),
      ...booking,
      status: 'Confirmed',
      bookedAt: new Date().toISOString(),
    }
  }
}

export async function deleteBooking(id) {
  try {
    await http.delete(`/bookings/${id}`)
    return true
  } catch (error) {
    console.warn('Backend not available, simulating booking deletion')
    return true
  }
}
