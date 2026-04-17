"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F68048] bg-[#F68048]/5 px-3 py-1 rounded-full mb-4">
            <Star className="w-3.5 h-3.5" />
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Loved by restaurant owners
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Hear from business owners who transformed their operations with Eats Desk.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          
          <TestimonialCard
            name="Ahmed Khan"
            role="Owner, Taste Bistro"
            location="Islamabad"
            text="Eats Desk replaced our paper system completely. The POS is incredibly fast and my staff picked it up in one day. The automatic inventory tracking alone saves us hours every week."
            rating={5}
            initials="AK"
            delay={0}
          />

          <TestimonialCard
            name="Fatima Riaz"
            role="Manager, Spice Garden"
            location="Lahore"
            text="We used to lose track of stock constantly. Now every order automatically deducts ingredients. The low-stock alerts mean we never run out during dinner rush anymore."
            rating={5}
            initials="FR"
            delay={150}
          />

          <TestimonialCard
            name="Omar Siddiqui"
            role="Owner, Burger Station"
            location="Karachi"
            text="The free website was a huge bonus. Customers found us on Google and started ordering online. Our revenue went up 30% in the first month. Incredible value for the price."
            rating={5}
            initials="OS"
            delay={300}
          />

        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  name,
  role,
  location,
  text,
  rating,
  initials,
  delay,
}: {
  name: string
  role: string
  location: string
  text: string
  rating: number
  initials: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay / 1000 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="h-full rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-1">
        “{text}”
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-[#F68048]/10 flex items-center justify-center text-[#F68048] font-bold text-sm">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">
            {role} · {location}
          </p>
        </div>
      </div>
    </motion.div>
  )
}