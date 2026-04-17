import Navbar from "@/components/website/Navbar"
import Hero from "@/components/website/Hero"
import Stats from "@/components/website/Stats"
import Features from "@/components/website/Features"
import Pricing from "@/components/website/Pricing"
import FAQ from "@/components/website/FAQ"
import Testimonials from "@/components/website/Testimonials"
import CTA from "@/components/website/CTA"
import Footer from "@/components/website/Footer"
import About from "@/components/website/About"
import Contact from "@/components/website/Contact"
import HowItWorks from "@/components/website/HowItWorks"

export default function Home() {
  return (
 <>
  <Navbar />
  <Hero />
  <Stats />
  <Features />
  <About />
  <HowItWorks />
  <Testimonials />
  <Pricing />
  <FAQ />
  <Contact />
  <CTA />
  <Footer />
</>
  )
}