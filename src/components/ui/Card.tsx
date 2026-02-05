import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

interface WorkCardProps {
  work: {
    id: string
    title: string
    type: string
    zone: string
    image: string
    date: string
  }
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Card className="mb-3">
      <img 
        src={work.image} 
        alt={work.title}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />
      <div>
        <h3 className="font-bold text-base text-slate-800 mb-1">{work.title}</h3>
        <p className="text-sm text-gray-600">{work.type} • {work.zone}</p>
        <p className="text-xs text-gray-500">{work.date}</p>
      </div>
    </Card>
  )
}