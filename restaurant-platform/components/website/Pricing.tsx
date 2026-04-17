"use client"

import { motion } from "framer-motion"
import { CircleCheck } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28">
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
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Flexible pricing plans for restaurants of all sizes. All include POS, inventory, menu management and a free restaurant website. Start with a <span className="font-semibold">3 month</span> free trial.
          </p>
        </motion.div>

        {/* Pricing Cards - 4 Column Grid */}
        <div className="grid gap-3 md:grid-cols-4 max-w-5xl mx-auto">
          
          {/* Free Trial Card */}
          <PricingCard
            title="Free Trial"
            price="Free"
            period="for 3 months"
            description="Try every feature of Eats Desk free for 3 full months."
            features={[
              "All features included",
              "Full access for 3 months",
              "Everything in Enterprise",
              "Unlimited branches",
              "Advanced analytics & reports",
              "POS, KDS & reservations"
            ]}
            buttonText="Start Free Trial"
            buttonVariant="dark"
            delay={0}
          />

          {/* Starter Card */}
          <PricingCard
            title="Starter"
            price="$39"
            period="per month"
            description="Perfect for small restaurants getting started."
            features={[
              "Single branch support",
              "Basic POS system",
              "Order management",
              "Menu & inventory tracking",
              "Customer database",
              "Free restaurant website",
              "Sales reports",
              "Email support"
            ]}
            buttonText="Start Free Trial"
            buttonVariant="dark"
            delay={100}
          />

          {/* Professional Card - Highlighted */}
          <PricingCard
            title="Professional"
            price="$79"
            period="per month"
            description="Everything you need to grow your restaurant."
            features={[
              "Up to 5 branches",
              "Full POS + Kitchen Display System",
              "Advanced inventory management",
              "Deals & promotions engine",
              "Reservations management",
              "Multi-user with role permissions",
              "Day-end reports & analytics",
              "Foodpanda integration",
              "Custom branded website",
              "Priority support"
            ]}
            buttonText="Start Free Trial"
            buttonVariant="primary"
            highlighted={true}
            badge="Most Popular"
            delay={200}
          />

          {/* Enterprise Card */}
          <PricingCard
            title="Enterprise"
            price="Contact for pricing"
            period="per month (billed quarterly)"
            description="Advanced features for multi-location operations."
            features={[
              "Unlimited branches",
              "Everything in Professional",
              "Advanced analytics dashboard",
              "Custom deal configurations",
              "API access for integrations",
              "White-label options",
              "Dedicated account manager",
              "Custom feature development",
              "24/7 priority support"
            ]}
            buttonText="Contact Sales"
            buttonVariant="dark"
            delay={300}
          />

        </div>
      </div>
    </section>
  )
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted,
  badge,
  delay,
}: {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "primary" | "dark"
  highlighted?: boolean
  badge?: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay / 1000 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`relative h-full rounded-2xl p-4 flex flex-col ${
        highlighted
          ? "bg-[#F68048] text-white border-2 border-[#F68048] shadow-xl shadow-[#F68048]/20 scale-[1.02]"
          : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg"
      } transition-all duration-300`}
    >
      {/* Popular Badge */}
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF7F11] text-white text-xs font-bold shadow-lg">
          {badge}
        </span>
      )}

      {/* Card Header */}
      <p className={`text-sm font-semibold mb-1 ${highlighted ? "text-white/80" : "text-gray-500"}`}>
        {title}
      </p>
      <p className={`text-3xl font-bold mb-1 ${highlighted ? "text-white" : ""}`}>
        {price}
      </p>
      <p className={`text-xs mb-3 ${highlighted ? "text-white/60" : "text-gray-400"}`}>
        {period}
      </p>
      <p className={`text-sm mb-6 ${highlighted ? "text-white/80" : "text-gray-600"}`}>
        {description}
      </p>

      {/* Features List */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <CircleCheck className={`w-4 h-4 shrink-0 ${
              highlighted 
                ? "text-emerald-300" 
                : "text-emerald-500"
            }`} />
            <span className={highlighted ? "text-white/90" : "text-gray-600"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          buttonVariant === "primary"
            ? "bg-white text-[#F68048] hover:bg-gray-100"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  )
}