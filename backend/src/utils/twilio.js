/**
 * Twilio SMS utility for sending OTP messages
 */

import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const TWILIO_ENABLED = process.env.TWILIO_ENABLED === 'true';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

let twilioClient = null;

// Initialize Twilio client if enabled
if (TWILIO_ENABLED && TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

/**
 * Send SMS OTP to phone number
 * @param {string} phoneNumber - The phone number to send OTP to
 * @param {string} otp - The OTP code to send
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendOTPviaSMS = async (phoneNumber, otp) => {
  // If Twilio is not enabled, skip and return success
  if (!TWILIO_ENABLED) {
    console.log(`📱 SMS disabled - OTP for ${phoneNumber}: ${otp}`);
    return { success: true, message: 'SMS disabled in development mode' };
  }

  // If Twilio client is not available
  if (!twilioClient) {
    console.warn('⚠️ Twilio not configured. Skipping SMS sending.');
    return { success: true, message: 'Twilio not configured' };
  }

  try {
    const message = await twilioClient.messages.create({
      body: `Your Mindhaven verification code is: ${otp}. This code expires in 10 minutes.`,
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log(`✓ SMS sent successfully to ${phoneNumber}. MessageSid: ${message.sid}`);
    return { success: true, message: 'SMS sent successfully' };
  } catch (error) {
    console.error('✗ Failed to send SMS:', error);
    return {
      success: false,
      message: 'Failed to send SMS. Please try again.',
      error: error.message,
    };
  }
};

/**
 * Check if Twilio is enabled
 */
export const isTwilioEnabled = () => TWILIO_ENABLED;

/**
 * Get Twilio status
 */
export const getTwilioStatus = () => ({
  enabled: TWILIO_ENABLED,
  configured: !!(twilioClient),
  message: TWILIO_ENABLED
    ? 'Twilio SMS enabled - real SMS will be sent'
    : 'Twilio SMS disabled - mock OTP mode',
});
