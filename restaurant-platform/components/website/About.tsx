"use client"

import { motion } from "framer-motion"
import { Utensils, ChefHat, Zap, ShieldCheck, TrendingUp } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F68048] bg-[#F68048]/5 px-3 py-1 rounded-full mb-4">
              <Utensils className="w-3.5 h-3.5" />
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Built by people who understand restaurants
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Eats Desk was born from a simple frustration: most restaurant software is either too complex, too expensive, or not built for how Pakistani restaurants actually work. We're changing that.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Our platform is designed from the ground up for fast-food counters, dine-in restaurants, and delivery kitchens across Pakistan. From Islamabad to Karachi, we help restaurant owners focus on food — not spreadsheets.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048] shrink-0">
                  <ChefHat className="w-4 h-4" />
                </div>
                Restaurant-first design
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048] shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                Fast & lightweight
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                Secure multi-tenant
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-[#F68048]/5 flex items-center justify-center text-[#F68048] shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                Grow with confidence
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
                <p className="text-3xl font-bold text-[#F68048] mb-1">10min</p>
                <p className="text-sm text-gray-600">Average setup time</p>
              </div>

              <div className="rounded-2xl bg-[#F68048] text-white p-6">
                <p className="text-3xl font-bold mb-1">3x</p>
                <p className="text-sm text-white/80">Faster order processing</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
                <p className="text-3xl font-bold text-[#F68048] mb-1">40%</p>
                <p className="text-sm text-gray-600">Less inventory waste</p>
              </div>

              <div className="rounded-2xl bg-gray-900 text-white p-6">
                <p className="text-3xl font-bold mb-1">Free</p>
                <p className="text-sm text-gray-400">Restaurant website included</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}