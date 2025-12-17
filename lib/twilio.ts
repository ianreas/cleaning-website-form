import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.warn('Twilio credentials not configured. SMS functionality will be disabled.')
}

export const twilioClient = accountSid && authToken 
  ? twilio(accountSid, authToken) 
  : null

export const TWILIO_PHONE_NUMBER = twilioPhoneNumber
export const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER || '+16469886601'

