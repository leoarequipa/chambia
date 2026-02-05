export interface Work {
  id: string
  title: string
  description: string
  type: string
  zone: string
  image: string
  date: string
  status: 'completed' | 'pending'
}

export interface Worker {
  id: string
  name: string
  trade: string
  avatar: string
  reputation: number
  works: Work[]
  stats: {
    totalWorks: number
    monthsActive: number
    zonesCovered: number
  }
  verified: boolean
  phone?: string
}

export interface Zone {
  id: string
  name: string
  district: string
}

export interface WorkType {
  id: string
  name: string
  icon: string
}