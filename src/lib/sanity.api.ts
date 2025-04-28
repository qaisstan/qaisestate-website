/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size,
 * or end up in a server-only function that don't need it.
 */

export const useCdn = false // Set to true for production if you want faster image loading, false for development/preview

// Read environment variables or provide defaults
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'okxop2jq' // Replace with your Project ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01' 