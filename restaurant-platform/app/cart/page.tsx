// app/cart/page.tsx
import { notFound, redirect } from 'next/navigation'
import { fetchRestaurant } from '@/lib/api'
import CartClient from '@/components/cart/CartClient'
import PageWrapper from '@/components/layout/PageWrapper'
import Header from '@/components/layout/Header' // Add Header import

interface PageProps {
  searchParams: Promise<{
    subdomain?: string
  }>
}

export default async function CartPage({ searchParams }: PageProps) {
  const { subdomain } = await searchParams
  
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
        <CartClient restaurant={restaurant} subdomain={subdomain} />
      </main>
    </PageWrapper>
  )
}