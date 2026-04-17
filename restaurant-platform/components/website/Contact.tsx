"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F68048] bg-[#F68048]/5 px-3 py-1 rounded-full mb-4">
              <Mail className="w-3.5 h-3.5" />
              Contact Us
            </span>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Get in touch
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              Have a question, need a demo, or want to discuss a custom plan for your chain? We'd love to hear from you.
            </p>

            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F68048]/5 flex items-center justify-center text-[#F68048] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">info.reddev@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F68048]/5 flex items-center justify-center text-[#F68048] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Phone / WhatsApp</p>
                  <p className="text-sm text-gray-600">+92 323 155 7988</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F68048]/5 flex items-center justify-center text-[#F68048] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Office</p>
                  <p className="text-sm text-gray-600">Islamabad, Pakistan</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Send us a message</h3>
              
              <form className="space-y-4">
                {/* Name and Phone Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F68048]/20 focus:border-[#F68048] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F68048]/20 focus:border-[#F68048] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F68048]/20 focus:border-[#F68048] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your restaurant and how we can help..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F68048]/20 focus:border-[#F68048] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-xl bg-[#F68048] text-white text-sm font-semibold hover:bg-[#F68048]/90 transition-all shadow-lg shadow-[#F68048]/25 hover:shadow-xl hover:shadow-[#F68048]/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}