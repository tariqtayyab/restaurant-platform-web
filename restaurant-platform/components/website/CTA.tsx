"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-16 bg-[#F68048]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your restaurant?
          </h2>

          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of restaurant owners who manage their POS, inventory, and website — all from one dashboard.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#F68048] text-base font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white text-base font-semibold hover:bg-white/10 transition-all"
            >
              Sign In
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}