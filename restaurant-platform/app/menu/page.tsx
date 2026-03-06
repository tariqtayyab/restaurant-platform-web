// app/[subdomain]/menu/page.tsx
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { notFound } from 'next/navigation'
import { fetchRestaurant } from '@/lib/api'
import PageWrapper from '@/components/layout/PageWrapper'
import Header from '@/components/layout/Header'
import CategoriesMenu from '@/components/menu/CategoriesMenu'

interface PageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function MenuPage({ params }: PageProps) {
  const { subdomain } = await params
  const restaurant = await fetchRestaurant(subdomain)
  
  if (!restaurant || !restaurant.isActive) {
    notFound()
  }
  
  return (
    <PageWrapper restaurant={restaurant} subdomain={subdomain}>
      <Header restaurant={restaurant} />
      <main className="min-h-screen pb-20 md:pb-0">
        <CategoriesMenu 
          restaurantName={restaurant.heroTitle}
          primaryColor={restaurant.primaryColor}
          secondaryColor={restaurant.secondaryColor}
          subdomain={subdomain}
        />
      </main>
    </PageWrapper>
  )
}