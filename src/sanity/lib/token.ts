export const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.warn(
    'Missing environment variable: SANITY_API_READ_TOKEN. Draft mode and live preview will not work. Get one at https://sanity.io/manage',
  )
}
