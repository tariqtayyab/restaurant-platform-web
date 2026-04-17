"use client"

import { motion } from "framer-motion"
import { Clock, ShoppingBag, Utensils, MonitorSmartphone, TrendingUp } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
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
            <Clock className="w-3.5 h-3.5" />
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Up and running in 4 simple steps
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A simple, repeatable flow that matches how your restaurant already operates.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-4">
          
          <Step
            number="01"
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Create Your Account"
            description="Sign up, add your restaurant name and basic details. Your free website is generated instantly."
            delay={0}
          />

          <Step
            number="02"
            icon={<Utensils className="w-8 h-8" />}
            title="Set Up Your Menu"
            description="Add categories, items, prices and images. Link each dish to inventory ingredients."
            delay={150}
          />

          <Step
            number="03"
            icon={<MonitorSmartphone className="w-8 h-8" />}
            title="Start Taking Orders"
            description="Staff log in to POS, create orders and close bills. Inventory updates automatically."
            delay={300}
          />

          <Step
            number="04"
            icon={<TrendingUp className="w-8 h-8" />}
            title="Track & Grow"
            description="Review daily reports, monitor costs and profits. Make data-driven decisions."
            delay={450}
            isLast
          />

        </div>
      </div>
    </section>
  )
}

function Step({
  number,
  icon,
  title,
  description,
  delay,
  isLast,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  delay: number
  isLast?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay / 1000 }}
      viewport={{ once: true }}
      className="relative text-center group"
    >
      {/* Connector Line (Desktop) */}
      {!isLast && (
        <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gray-200 group-hover:bg-[#F68048]/30 transition-colors"></div>
      )}

      {/* Icon Circle */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#F68048]/5 text-[#F68048] mb-5 group-hover:bg-[#F68048] group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#F68048]/25 group-hover:-translate-y-1">
        {icon}
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#F68048] text-white text-xs font-bold flex items-center justify-center shadow-lg">
          {number}
        </span>
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}