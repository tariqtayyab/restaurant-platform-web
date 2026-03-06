// app/[subdomain]/cart/page.tsx
import { notFound } from 'next/navigation'
import { fetchRestaurant } from '@/lib/api'
import CartClient from '@/components/cart/CartClient'
import PageWrapper from '@/components/layout/PageWrapper'
import Header from '@/components/layout/Header'

interface PageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function CartPage({ params }: PageProps) {
  const { subdomain } = await params  // Get from params, not searchParams
  
  const restaurant = await fetchRestaurant(subdomain)
  
  if (!restaurant || !restaurant.isActive) {
    notFound()
  }
  
  return (
    <PageWrapper restaurant={restaurant} subdomain={subdomain}>
      <Header restaurant={restaurant} />
      <main className="min-h-screen pb-20 md:pb-0">
        <CartClient restaurant={restaurant} subdomain={subdomain} />
      </main>
    </PageWrapper>
  )
}