"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Is my data safe and separated from other restaurants?",
    answer: "Absolutely. Eats Desk is a multi-tenant platform where each restaurant has its own isolated data space. Your data is never shared with or accessible to other tenants. We use industry-standard encryption and secure authentication."
  },
  {
    question: "Do I get a website immediately?",
    answer: "Yes! As soon as you sign up and create your restaurant, a professional website is automatically generated on your subdomain (e.g., yourrestaurant.eatsdesk.com). Your menu syncs in real-time and you can customize branding, colors, and content."
  },
  {
    question: "Can staff access reports and analytics?",
    answer: "Staff roles like cashiers only see the POS. Owners, admins, and managers get full access to dashboards, inventory, day reports, and analytics. You control exactly who sees what."
  },
  {
    question: "Do you support online ordering?",
    answer: "Yes! Customers can browse your auto-generated website, add items to cart, and place orders with cash-on-delivery. Orders appear instantly in your dashboard alongside POS orders."
  },
  {
    question: "What happens when inventory runs low?",
    answer: "The system automatically shows low-stock alerts on your dashboard. Menu items with insufficient inventory are automatically hidden from your website and marked as 'Out of Stock' on POS, so you never sell what you can't make."
  },
  {
    question: "Can I try it before paying?",
    answer: "Yes — every new restaurant gets a full 14-day free trial with all features unlocked. No credit card required to start. You can upgrade to a paid plan anytime during or after the trial."
  }
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about Eats Desk.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-sm font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}