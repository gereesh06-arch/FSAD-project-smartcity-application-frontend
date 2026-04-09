/** Strip non-digits (spaces, dashes, country code formatting). */
export function digitsOnlyPhone(value) {
  return String(value ?? '').replace(/\D/g, '')
}

/** Ten-digit mobile (e.g. India): exactly 10 numeric digits. */
export function isValidTenDigitPhone(value) {
  return /^\d{10}$/.test(digitsOnlyPhone(value))
}

export const PHONE_TEN_DIGIT_MESSAGE = 'Phone number must be exactly 10 digits'
