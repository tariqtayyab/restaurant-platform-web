// app/[subdomain]/page.tsx
import { notFound } from 'next/navigation'

// This is a Server Component by default in App Router
interface PageProps {
  params: {
    subdomain: string
  }
}

// Mock data for now - replace with actual API call
async function getRestaurantData(subdomain: string) {
  // TODO: Replace with actual API call to your backend
  // const response = await fetch(`http://localhost:3000/api/restaurant/${subdomain}`)
  // return response.json()
  
  // Mock data for testing
  const restaurants: Record<string, any> = {
    'chillout': {
      name: 'Chill Out Cafe',
      logo: '/logos/chillout.png',
      theme: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        background: '#F7F9FC'
      },
      workingHours: [
        { day: 'Monday', open: '09:00', close: '22:00', closed: false },
        { day: 'Tuesday', open: '09:00', close: '22:00', closed: false },
        { day: 'Wednesday', open: '09:00', close: '22:00', closed: false },
      ],
      heroTitle: 'Welcome to Chill Out Cafe',
      heroDescription: 'Best coffee in town'
    },
    'pizzahut': {
      name: 'Pizza Hut Express',
      logo: '/logos/pizzahut.png',
      theme: {
        primary: '#E31837',
        secondary: '#006491',
        background: '#FFFFFF'
      },
      workingHours: [
        { day: 'Monday', open: '11:00', close: '23:00', closed: false },
        { day: 'Tuesday', open: '11:00', close: '23:00', closed: false },
      ],
      heroTitle: 'Pizza Hut Express',
      heroDescription: 'Delicious pizza delivered fast'
    }
  }
  
  return restaurants[subdomain] || null
}

export default async function RestaurantPage({ params }: PageProps) {
  const restaurant = await getRestaurantData(params.subdomain)
  
  if (!restaurant) {
    notFound() // Shows 404 page if restaurant doesn't exist
  }
  
  return (
    <main style={{ backgroundColor: restaurant.theme.background }}>
      {/* Header with dynamic logo */}
      <header style={{ backgroundColor: restaurant.theme.primary }}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              {restaurant.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={restaurant.logo} 
                  alt={restaurant.name}
                  className="h-12 w-auto"
                />
              ) : (
                <h1 className="text-2xl font-bold text-white">
                  {restaurant.name}
                </h1>
              )}
            </div>
            
            {/* Working hours preview */}
            <div className="text-white text-sm">
              {restaurant.workingHours[0]?.open} - {restaurant.workingHours[0]?.close}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4" 
              style={{ color: restaurant.theme.primary }}>
            {restaurant.heroTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {restaurant.heroDescription}
          </p>
          <button 
            className="px-8 py-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: restaurant.theme.secondary }}>
            View Menu
          </button>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
          <div className="grid gap-4 max-w-md">
            {restaurant.workingHours.map((hour: any) => (
              <div key={hour.day} className="flex justify-between">
                <span className="font-medium">{hour.day}</span>
                <span>
                  {hour.closed ? 'Closed' : `${hour.open} - ${hour.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}