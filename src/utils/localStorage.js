export function getSavedIssueResponses() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem('smartcityIssueResponses') || '{}')
  } catch {
    return {}
  }
}

export function saveIssueResponse(issueId, response, status = 'In Progress') {
  if (typeof window === 'undefined') return
  const current = getSavedIssueResponses()
  const next = {
    ...current,
    [issueId]: {
      response,
      status,
      updatedAt: new Date().toISOString(),
    },
  }
  window.localStorage.setItem('smartcityIssueResponses', JSON.stringify(next))
  return next
}

export function getSavedBookings() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(window.localStorage.getItem('smartcityBookings') || '[]')
  } catch {
    return []
  }
}

export function saveBooking(booking) {
  if (typeof window === 'undefined') return []
  const current = getSavedBookings()
  const next = [...current, booking]
  window.localStorage.setItem('smartcityBookings', JSON.stringify(next))
  return next
}
