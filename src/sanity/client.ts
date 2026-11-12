import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set false to ensure instant updates when editing content
})

export function isSanityConfigured(): boolean {
  return Boolean(projectId && dataset)
}

