// components/sections/Hero.tsx
import { Restaurant } from '../types'
import Button from '../ui/Button'
import Container from '../ui/Container'

interface HeroProps {
  restaurant: Restaurant
}

export default function Hero({ restaurant }: HeroProps) {
  return (
    <section className="py-20 px-4">
      <Container>
        <div className="text-center">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{ color: restaurant.primaryColor }}
          >
            {restaurant.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {restaurant.heroDescription}
          </p>
          <div className="space-x-4">
            <Button color={restaurant.secondaryColor}>
              View Full Menu
            </Button>
            <Button variant="outline" color={restaurant.secondaryColor}>
              Order Online
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}