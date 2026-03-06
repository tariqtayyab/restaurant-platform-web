// app/[subdomain]/menu/page.tsx
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { notFound } from 'next/navigation'
import { fetchRestaurant } from '@/lib/api'
import PageWrapper from '@/components/layout/PageWrapper'
import Header from '@/components/layout/Header'
import ClientMenu from '@/components/menu/ClientMenu' 

interface PageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function MenuPage({ params }: PageProps) {
  const { subdomain } = await params
  
  // Still fetch restaurant data on server (this is lightweight and needed for layout)
  const restaurant = await fetchRestaurant(subdomain).catch(() => null)
  
  if (!restaurant || !restaurant.isActive) {
    notFound()
  }
  
  return (
    <PageWrapper restaurant={restaurant} subdomain={subdomain}>
      <Header restaurant={restaurant} />
      <main className="min-h-screen pb-20 md:pb-0">
        {/* Use client component for menu data */}
        <ClientMenu 
          restaurantName={restaurant.heroTitle}
          primaryColor={restaurant.primaryColor}
          secondaryColor={restaurant.secondaryColor}
          subdomain={subdomain}
        />
      </main>
    </PageWrapper>
  )
}