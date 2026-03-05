// app/[subdomain]/page.tsx
import { notFound } from 'next/navigation'

// Define TypeScript interfaces for better type safety
interface WorkingHour {
  day: string
  open: string
  close: string
  closed: boolean
}

interface Theme {
  primary: string
  secondary: string
  background: string
}

interface Restaurant {
  name: string
  logo: string | null
  theme: Theme
  workingHours: WorkingHour[]
  heroTitle: string
  heroDescription: string
}

// Update PageProps to use Promise (required for Next.js 16.1.6)
interface PageProps {
  params: Promise<{
    subdomain: string
  }>
}

// Mock data function with proper typing
async function getRestaurantData(subdomain: string): Promise<Restaurant | null> {
  // TODO: Replace with actual API call to your backend
  // const response = await fetch(`https://your-api.com/restaurant/${subdomain}`)
  // return response.json()
  
  // Mock data for testing
  const restaurants: Record<string, Restaurant> = {
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
        { day: 'Thursday', open: '09:00', close: '22:00', closed: false },
        { day: 'Friday', open: '09:00', close: '23:00', closed: false },
        { day: 'Saturday', open: '10:00', close: '23:00', closed: false },
        { day: 'Sunday', open: '10:00', close: '22:00', closed: false }
      ],
      heroTitle: 'Welcome to Chill Out Cafe',
      heroDescription: 'Best coffee in town with a relaxing atmosphere'
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
        { day: 'Wednesday', open: '11:00', close: '23:00', closed: false },
        { day: 'Thursday', open: '11:00', close: '23:00', closed: false },
        { day: 'Friday', open: '11:00', close: '00:00', closed: false },
        { day: 'Saturday', open: '12:00', close: '00:00', closed: false },
        { day: 'Sunday', open: '12:00', close: '23:00', closed: false }
      ],
      heroTitle: 'Pizza Hut Express',
      heroDescription: 'Delicious pizza delivered fast to your door'
    },
    'burgerking': {
      name: 'Burger King',
      logo: '/logos/burgerking.png',
      theme: {
        primary: '#F5A623',
        secondary: '#D62323',
        background: '#FFF8E7'
      },
      workingHours: [
        { day: 'Monday', open: '10:00', close: '22:00', closed: false },
        { day: 'Tuesday', open: '10:00', close: '22:00', closed: false },
        { day: 'Wednesday', open: '10:00', close: '22:00', closed: false },
        { day: 'Thursday', open: '10:00', close: '22:00', closed: false },
        { day: 'Friday', open: '10:00', close: '23:00', closed: false },
        { day: 'Saturday', open: '10:00', close: '23:00', closed: false },
        { day: 'Sunday', open: '11:00', close: '22:00', closed: false }
      ],
      heroTitle: 'Have It Your Way',
      heroDescription: 'Flame-grilled burgers made fresh'
    }
  }
  
  return restaurants[subdomain] || null
}

export default async function RestaurantPage({ params }: PageProps) {
  // Await the params to get the subdomain (required for Next.js 16.1.6)
  const { subdomain } = await params
  const restaurant = await getRestaurantData(subdomain)
  
  // If restaurant doesn't exist, show 404
  if (!restaurant) {
    notFound()
  }
  
  return (
    <main style={{ backgroundColor: restaurant.theme.background }}>
      {/* Header with dynamic logo and theme */}
      <header style={{ backgroundColor: restaurant.theme.primary }}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Restaurant Name */}
            <div className="flex items-center space-x-4">
              {restaurant.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={restaurant.logo} 
                  alt={restaurant.name}
                  className="h-12 w-auto"
                  onError={(e) => {
                    // If logo fails to load, hide it
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : null}
              <h1 className="text-2xl font-bold text-white">
                {restaurant.name}
              </h1>
            </div>
            
            {/* Working hours preview */}
            <div className="text-white text-sm bg-black bg-opacity-20 px-3 py-1 rounded-full">
              Today: {restaurant.workingHours[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.open} - {
                restaurant.workingHours[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.close
              }
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
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {restaurant.heroDescription}
          </p>
          <div className="space-x-4">
            <button 
              className="px-8 py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: restaurant.theme.secondary }}>
              View Full Menu
            </button>
            <button 
              className="px-8 py-3 rounded-lg font-semibold border-2 transition-colors"
              style={{ 
                borderColor: restaurant.theme.secondary,
                color: restaurant.theme.secondary
              }}>
              Order Online
            </button>
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">Opening Hours</h3>
          <div className="grid gap-4 max-w-md mx-auto">
            {restaurant.workingHours.map((hour) => (
              <div key={hour.day} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium text-gray-700">{hour.day}</span>
                <span className={hour.closed ? 'text-red-500 font-semibold' : 'text-gray-600'}>
                  {hour.closed ? 'Closed' : `${hour.open} - ${hour.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Promotion Section (Example of additional content) */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🍔</div>
              <h4 className="text-xl font-semibold mb-2">Fresh Ingredients</h4>
              <p className="text-gray-600">We use only the freshest ingredients in all our dishes</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h4 className="text-xl font-semibold mb-2">Fast Delivery</h4>
              <p className="text-gray-600">Free delivery on orders above $30</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💳</div>
              <h4 className="text-xl font-semibold mb-2">Easy Payment</h4>
              <p className="text-gray-600">Multiple payment options available</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Generate metadata for SEO based on restaurant data
export async function generateMetadata({ params }: PageProps) {
  const { subdomain } = await params
  const restaurant = await getRestaurantData(subdomain)
  
  if (!restaurant) {
    return {
      title: 'Restaurant Not Found'
    }
  }
  
  return {
    title: `${restaurant.name} - Order Online`,
    description: restaurant.heroDescription,
    openGraph: {
      title: restaurant.name,
      description: restaurant.heroDescription,
      type: 'website',
    }
  }
}