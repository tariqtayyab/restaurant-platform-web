// components/sections/Contact.tsx
import { Restaurant } from '../types'
import Container from '../ui/Container'

interface ContactProps {
  restaurant: Restaurant
}

export default function Contact({ restaurant }: ContactProps) {
  const contactItems = [
    { icon: '📞', label: 'Phone', value: restaurant.contactPhone },
    { icon: '✉️', label: 'Email', value: restaurant.contactEmail },
    { icon: '📍', label: 'Address', value: restaurant.contactAddress }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {contactItems.map((item) => (
            <div key={item.label} className="text-center p-6">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
              <p className="text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}