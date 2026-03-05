// components/sections/Features.tsx
import Container from '../ui/Container'

const features = [
  {
    icon: '🍔',
    title: 'Fresh Ingredients',
    description: 'We use only the freshest ingredients in all our dishes'
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Free delivery on orders above $30'
  },
  {
    icon: '💳',
    title: 'Easy Payment',
    description: 'Multiple payment options available'
  }
]

export default function Features() {
  return (
    <section className="py-16 px-4">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}