// app/search/page.tsx
import { notFound, redirect } from 'next/navigation'
import { fetchRestaurant } from '@/lib/api'
import SearchClient from '@/components/search/SearchClient'
import PageWrapper from '@/components/layout/PageWrapper'
import Header from '@/components/layout/Header' // Add Header import

interface PageProps {
  searchParams: Promise<{
    subdomain?: string
    q?: string
  }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { subdomain, q } = await searchParams
  
  if (!subdomain) {
    redirect('/')
  }
  
  const restaurant = await fetchRestaurant(subdomain)
  
  if (!restaurant || !restaurant.isActive) {
    notFound()
  }
  
  return (
    <PageWrapper restaurant={restaurant} subdomain={subdomain}>
      <Header restaurant={restaurant} /> {/* Add Header here */}
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