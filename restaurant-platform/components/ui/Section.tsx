// components/ui/Section.tsx
interface SectionProps {
  children: React.ReactNode
  className?: string
  bgColor?: string
}

export default function Section({ children, className = '', bgColor }: SectionProps) {
  return (
    <section className={`py-16 px-4 ${className}`} style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  )
}