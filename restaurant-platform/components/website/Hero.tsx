"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, CircleCheck } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F68048]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF7F11]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0 items-center"> {/* Removed gap on large screens */}
          
          {/* LEFT CONTENT */}
          <div className="lg:pr-12"> {/* Added right padding to create space between columns */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0 }}
              className="transition-all duration-700 ease-out"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#F68048] bg-[#F68048]/5 border border-[#F68048]/15 px-3 py-1.5 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5" />
                Built for Pakistani Restaurants
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="transition-all duration-700 ease-out"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Run your restaurant<br />
                from <span className="text-[#F68048]">one place</span>.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="transition-all duration-700 ease-out"
            >
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Eats Desk combines POS, inventory tracking, and a free branded website — all in one platform designed for how you actually work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="transition-all duration-700 ease-out"
            >
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F68048] text-white text-base font-semibold hover:bg-[#F68048]/90 transition-all shadow-lg shadow-[#F68048]/25 hover:shadow-xl hover:shadow-[#F68048]/30 hover:-translate-y-0.5"
                >
                  Start Free 14-Day Trial
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-base font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  See how it works
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="transition-all duration-700 ease-out"
            >
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4 text-emerald-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4 text-emerald-500" />
                  Free restaurant website
                </span>
                <span className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4 text-emerald-500" />
                  Set up in 10 minutes
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT DASHBOARD MOCK */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="transition-all duration-700 ease-out"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#F68048]/10 via-[#FF7F11]/10 to-transparent rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/50 p-6 space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Today's Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">PKR 128,450</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live POS
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-earth w-3 h-3">
                        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path>
                        <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path>
                        <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                      Website Active
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                    <p className="text-[11px] text-gray-500 mb-1">Orders Today</p>
                    <p className="text-xl font-bold text-gray-900">74</p>
                    <p className="text-[11px] text-emerald-600 font-medium">+18% ↑</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                    <p className="text-[11px] text-gray-500 mb-1">Low Stock</p>
                    <p className="text-xl font-bold text-gray-900">5</p>
                    <p className="text-[11px] text-amber-600 font-medium">Restock soon</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                    <p className="text-[11px] text-gray-500 mb-1">Active Staff</p>
                    <p className="text-xl font-bold text-gray-900">3</p>
                    <p className="text-[11px] text-gray-500">1 admin · 2 staff</p>
                  </div>
                </div>

                {/* Sales Chart */}
                <div className="flex items-end gap-1 h-12 px-2">
                  {[35, 50, 42, 60, 55, 72, 68, 80, 75, 90, 85, 95, 88, 70, 60, 50, 45, 55, 65, 78, 85, 92, 88, 75].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-[#F68048]/20 hover:bg-[#F68048]/40 transition-colors"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 text-center">Hourly sales trend</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}