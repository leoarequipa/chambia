import { Card } from './Card'

interface ReputationBadgeProps {
  reputation: number
  consistency?: number
  badges?: string[]
  compact?: boolean
}

export function ReputationBadge({ reputation, consistency, badges = [], compact = false }: ReputationBadgeProps) {
  const getStars = () => {
    const fullStars = Math.floor(reputation)
    const hasHalfStar = reputation % 1 >= 0.5
    const stars = []

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-500 text-lg">⭐</span>)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-500 text-lg opacity-70">⭐</span>)
      } else {
        stars.push(<span key={i} className="text-gray-300 text-lg">⭐</span>)
      }
    }
    return stars
  }

  const getReputationLevel = () => {
    if (reputation >= 4.8) return { text: 'Excelente', color: 'text-green-600' }
    if (reputation >= 4.2) return { text: 'Muy bueno', color: 'text-blue-600' }
    if (reputation >= 3.5) return { text: 'Bueno', color: 'text-orange-600' }
    if (reputation >= 2.8) return { text: 'Regular', color: 'text-yellow-600' }
    return { text: 'En desarrollo', color: 'text-gray-600' }
  }

  if (compact) {
    const level = getReputationLevel()
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {getStars()}
        </div>
        <span className={`font-semibold text-sm ${level.color}`}>
          {reputation.toFixed(1)}
        </span>
      </div>
    )
  }

  const level = getReputationLevel()

  return (
    <Card>
      <div className="text-center">
        <h3 className="font-bold text-lg mb-3">📈 Tu Reputación</h3>
        
        <div className="flex justify-center gap-1 mb-2">
          {getStars()}
        </div>
        
        <div className="text-2xl font-bold text-orange-500 mb-1">
          {reputation.toFixed(1)}
        </div>
        
        <div className={`text-sm font-semibold mb-3 ${level.color}`}>
          {level.text}
        </div>

        {consistency !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Consistencia</span>
              <span>{consistency}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${consistency}%` }}
              ></div>
            </div>
          </div>
        )}

        {badges.length > 0 && (
          <div>
            <p className="text-xs text-gray-600 mb-2">Insignias ganadas</p>
            <div className="flex flex-wrap justify-center gap-1">
              {badges.map((badge, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full"
                >
                  🏆 {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 text-xs text-gray-500">
          💀 Tu reputación mejora con cada trabajo que registras
        </div>
      </div>
    </Card>
  )
}