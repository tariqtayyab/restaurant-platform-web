// lib/api.ts
const API_BASE_URL = process.env.API_BASE_URL || 'https://localhost:7026'

export async function fetchRestaurant(subdomain: string) {
  const response = await fetch(`${API_BASE_URL}/api/public/website/${subdomain}`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  })
  
  if (response.status === 404) {
    return null
  }
  
  if (!response.ok) {
    throw new Error('Failed to fetch restaurant')
  }
  
  return response.json()
}