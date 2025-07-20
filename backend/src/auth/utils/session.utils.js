
const crypto = require('crypto');
const dayjs = require('dayjs');

async function generateSession(userId, rememberMe) {
  const sessionId = crypto.randomBytes(36).toString('base64');
  const daysValid = rememberMe ? 30 : 3;
  const expiredAt = dayjs().add(daysValid, 'day').toDate();

  return { userId, sessionId, expiredAt, rememberMe };
}

module.exports = { generateSession };
