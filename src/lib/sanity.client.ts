import { createClient, type ClientConfig } from '@sanity/client'
import { apiVersion, dataset, projectId, useCdn } from '@/lib/sanity.api'

// Determine if we are server-side or client-side to conditionally use token
const isServer = typeof window === 'undefined'

const clientConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
  // Use perspective: 'published' for production builds, 
  // or 'previewDrafts' during development/preview
  // Note: Preview requires a read token with viewer permissions
  perspective: isServer ? 'published' : 'previewDrafts',
  // Conditionally add token if it exists and we are server-side or in preview
  // token: isServer && process.env.SANITY_API_READ_TOKEN ? process.env.SANITY_API_READ_TOKEN : undefined,
  // Alternatively, for simpler setup without preview drafts initially:
  // perspective: 'published',
}

export const sanityClient = createClient(clientConfig)

// Helper function to generate image URLs with the client
// (We might move this to a dedicated image utils file later)
import imageUrlBuilder from '@sanity/image-url'

// Define a basic type for the expected image source object
type SanityImageSource = {
  _type?: string; // Optional, might be 'image'
  asset?: {
    _ref: string;
    _type: 'reference';
  };
  // Include other potential fields like hotspot, crop if needed
};

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImageSource) {
  // Ensure that source image has asset object with _ref
  if (!source?.asset?._ref) {
    return undefined
  }

  return builder.image(source).auto('format').fit('max')
} 