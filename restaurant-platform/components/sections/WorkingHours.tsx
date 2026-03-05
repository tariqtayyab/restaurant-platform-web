// components/sections/WorkingHours.tsx
import { Restaurant } from '../types'
import Container from '../ui/Container'

interface WorkingHoursProps {
  restaurant: Restaurant
}

export default function WorkingHours({ restaurant }: WorkingHoursProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold mb-8 text-center">Opening Hours</h2>
        <div className="grid gap-4 max-w-md mx-auto">
          {restaurant.workingHours.map((hour) => (
            <div 
              key={hour.day} 
              className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-700">{hour.day}</span>
              <span className={hour.closed ? 'text-red-500 font-semibold' : 'text-gray-600'}>
                {hour.closed ? 'Closed' : `${hour.open} - ${hour.close}`}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}