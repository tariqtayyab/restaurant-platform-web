// app/[subdomain]/search/page.tsx
import { notFound } from 'next/navigation'
import { fetchRestaurant } from '@/lib/api'
import SearchClient from '@/components/search/SearchClient'
import PageWrapper from '@/components/layout/PageWrapper'
import Header from '@/components/layout/Header'

interface PageProps {
  params: Promise<{
    subdomain: string
  }>
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ params, searchParams }: PageProps) {
  const { subdomain } = await params  // Get subdomain from params, NOT searchParams
  const { q } = await searchParams    // Get search query from searchParams
  
  const restaurant = await fetchRestaurant(subdomain)
  
  if (!restaurant || !restaurant.isActive) {
    notFound()
  }
  
  return (
    <PageWrapper restaurant={restaurant} subdomain={subdomain}>
      <Header restaurant={restaurant} />
      <main style={{ backgroundColor: restaurant.backgroundColor }} className="min-h-screen pb-20 md:pb-0">
        <SearchClient 
          restaurant={restaurant}
          subdomain={subdomain}
          initialQuery={q || ''}
        />
      </main>
    </PageWrapper>
  )
}