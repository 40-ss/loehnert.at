import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

if (!projectId || !dataset) {
  // Fail loudly in dev so the cause is obvious, not a silent empty page.
  console.error(
    '[sanity] Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET — check .env.local',
  )
}

export const client = createClient({
  projectId,
  dataset,
  // API version pin: bump deliberately, never use "latest" in production.
  apiVersion: '2025-05-18',
  // Public CDN: fast, cached, ~minute eventual-consistency lag after publishing.
  // Set to false if you ever need read-after-write consistency.
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

/**
 * Build a URL for a Sanity image reference, with optional transformations.
 * Usage: `urlFor(profile.headshot).width(800).height(800).url()`
 */
export const urlFor = (source) => builder.image(source)
