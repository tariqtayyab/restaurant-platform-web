// components/types/index.ts
export interface WorkingHour {
  day: string
  open: string
  close: string
  closed: boolean
}

export interface Restaurant {
  id: number
  merchantId: number
  subdomain: string
  logoUrl: string | null
  primaryColor: string
  secondaryColor: string
  backgroundColor?: string
  heroTitle: string
  heroDescription: string
  workingHours: WorkingHour[]
  contactPhone: string
  contactEmail: string
  contactAddress: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string | null
}