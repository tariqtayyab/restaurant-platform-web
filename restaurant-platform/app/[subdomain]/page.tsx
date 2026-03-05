// app/[subdomain]/page.tsx
import { notFound } from 'next/navigation'
import { fetchRestaurant } from '@/lib/api'
import PageWrapper from '@/components/layout/PageWrapper'

// Components
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import WorkingHours from '@/components/sections/WorkingHours'
import Features from '@/components/sections/Features'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import CategoriesMenu from '@/components/menu/CategoriesMenu'
// import CartDrawer from '@/components/cart/CartDrawer'

interface PageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function RestaurantPage({ params }: PageProps) {
  const { subdomain } = await params
  const restaurant = await fetchRestaurant(subdomain)
  
  if (!restaurant || !restaurant.isActive) {
    notFound()
  }
  
  return (
    <PageWrapper restaurant={restaurant} subdomain={subdomain}>
      <main style={{ backgroundColor: restaurant.backgroundColor }} className="pb-20 md:pb-0">
        <Header restaurant={restaurant} />
        <Hero restaurant={restaurant} />
        <CategoriesMenu 
  restaurantName={restaurant.heroTitle}
  primaryColor={restaurant.primaryColor}
  secondaryColor={restaurant.secondaryColor}
  subdomain={subdomain} // Add this
/>
        <WorkingHours restaurant={restaurant} />
        <Features />
        <Contact restaurant={restaurant} />
        <Footer restaurant={restaurant} />
      </main>
      {/* <CartDrawer /> */}
    </PageWrapper>
  )
}