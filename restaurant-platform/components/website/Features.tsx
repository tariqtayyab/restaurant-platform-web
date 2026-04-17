"use client"

import { motion } from "framer-motion"
import { 
  MonitorSmartphone, 
  Package, 
  Earth, 
  ChartColumn, 
  Users, 
  ShoppingBag,
  ShieldCheck,
  Zap,
  ChefHat,
  TrendingUp
} from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
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
            <ShieldCheck className="w-3.5 h-3.5" />
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything your restaurant needs
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Three powerful modules that work together seamlessly — designed for busy counters, small teams, and owners who want clarity.
          </p>
        </motion.div>

        {/* Main Feature Grid - 3 Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          
          <FeatureCard
            icon={<MonitorSmartphone className="w-6 h-6" />}
            title="Lightning-Fast POS"
            description="Create orders in 2 taps. Supports dine-in, takeaway & delivery with cash, card, or online payments."
            color="blue"
            features={[
              "Instant order creation",
              "Discount & coupon support",
              "Auto-synced with your menu",
              "End-of-day sales reports"
            ]}
          />

          <FeatureCard
            icon={<Package className="w-6 h-6" />}
            title="Smart Inventory"
            description="Link every dish to its ingredients. Stock updates automatically with every completed order."
            color="amber"
            features={[
              "Auto stock deduction",
              "Low-stock alerts",
              "Cost price tracking",
              "Units in kg, liter, piece"
            ]}
          />

          <FeatureCard
            icon={<Earth className="w-6 h-6" />}
            title="Free Restaurant Website"
            description="Every restaurant gets a professional website on their own subdomain — instantly, at zero extra cost."
            color="emerald"
            features={[
              "Auto-generated on signup",
              "Live menu always in sync",
              "Online ordering ready",
              "Custom branding & colors"
            ]}
          />

        </div>

        {/* Secondary Feature Grid - 3 Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          
          <SecondaryFeatureCard
            icon={<ChartColumn className="w-5 h-5" />}
            title="Daily Reports & Analytics"
            description="Revenue, profit, cost breakdown, and top-selling items — all in real-time dashboards."
          />

          <SecondaryFeatureCard
            icon={<Users className="w-5 h-5" />}
            title="Multi-Role Staff Access"
            description="Owner, admin, cashier, kitchen staff — each role sees only what they need."
          />

          <SecondaryFeatureCard
            icon={<ShoppingBag className="w-5 h-5" />}
            title="Online Orders"
            description="Accept orders directly from your website. Customers browse, order, and pay online."
          />

        </div>

        {/* Hidden extra features that appear in original but might be for another section */}
        {/* Keeping them commented for reference */}
        {/* 
        <div className="grid grid-cols-2 gap-4 mt-12">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048]">
              <ChefHat className="w-4 h-4" />
            </div>
            Restaurant-first design
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048]">
              <Zap className="w-4 h-4" />
            </div>
            Fast & lightweight
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            Secure multi-tenant
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048]">
              <TrendingUp className="w-4 h-4" />
            </div>
            Grow with confidence
          </div>
        </div>
        */}
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description, features, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  features: string[];
  color: "blue" | "amber" | "emerald";
}) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "hover:border-blue-300"
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "hover:border-amber-300"
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "hover:border-emerald-300"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`group h-full rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#F68048]/30 hover:shadow-xl hover:shadow-[#F68048]/5 transition-all duration-300`}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colorClasses[color].bg} ${colorClasses[color].text} mb-5`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check w-4 h-4 text-emerald-500 shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function SecondaryFeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="flex gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300"
    >
      <div className="shrink-0 w-10 h-10 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048]">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}