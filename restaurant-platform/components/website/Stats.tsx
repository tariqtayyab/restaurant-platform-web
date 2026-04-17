"use client"

import CountUp from "react-countup"
import { motion } from "framer-motion"

export default function Stats() {
  return (
    <section className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#F68048]">
              <CountUp end={500} duration={2} separator="," />+
            </p>
            <p className="text-sm text-gray-600 mt-1">Restaurants Onboarded</p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#F68048]">
              <CountUp end={50} duration={2} suffix="K" />+
            </p>
            <p className="text-sm text-gray-600 mt-1">Orders Processed</p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#F68048]">
              <CountUp end={99.9} duration={2} decimals={1} />%
            </p>
            <p className="text-sm text-gray-600 mt-1">Uptime Reliability</p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#F68048]">
              24/7
            </p>
            <p className="text-sm text-gray-600 mt-1">Customer Support</p>
          </div>

        </motion.div>
      </div>
    </section>
  )
}