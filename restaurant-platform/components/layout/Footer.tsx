// components/layout/Footer.tsx
import { Restaurant } from '../types'
import Container from '../ui/Container'

interface FooterProps {
  restaurant: Restaurant
}

export default function Footer({ restaurant }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">{restaurant.contactPhone}</p>
            <p className="text-gray-400 mb-2">{restaurant.contactEmail}</p>
            <p className="text-gray-400">{restaurant.contactAddress}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-2">
              {restaurant.workingHours.map((hour) => (
                <div key={hour.day} className="flex justify-between text-gray-400">
                  <span>{hour.day}</span>
                  <span>
                    {hour.closed ? 'Closed' : `${hour.open} - ${hour.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media links here when available */}
              <span className="text-gray-400">Coming Soon</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {restaurant.heroTitle}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}