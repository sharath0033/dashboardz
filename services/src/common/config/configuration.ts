export default () => ({
  ENVIRONMENT: process.env.ENVIRONMENT,
  FIREBASE_ADMIN_CREDENTIALS: JSON.parse(
    Buffer.from(
      process.env.GOOGLE_APPLICATION_CREDENTIALS,
      'base64'
    ).toString()
  ),
})
