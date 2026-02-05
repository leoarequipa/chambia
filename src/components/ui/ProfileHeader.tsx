interface ProfileHeaderProps {
  name: string
  trade: string
  avatar: string
  reputation: number
  verified?: boolean
  stats?: {
    totalWorks: number
    monthsActive: number
    zonesCovered: number
  }
}

export function ProfileHeader({ 
  name, 
  trade, 
  avatar, 
  reputation, 
  verified = false,
  stats
}: ProfileHeaderProps) {
  const renderStars = () => {
    const fullStars = Math.floor(reputation)
    const hasHalfStar = reputation % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-500 text-xl">⭐</span>)
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-500 text-xl">⭐</span>)
    }

    // Rellenar con estrellas vacías
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 text-xl">⭐</span>)
    }

    return stars
  }

  return (
    <div className="text-center py-6">
      <img 
        src={avatar} 
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 mx-auto mb-3"
      />
      <h2 className="text-xl font-bold text-slate-800 mb-1">{name}</h2>
      <p className="text-base text-slate-600 mb-3">{trade}</p>
      
      <div className="flex items-center justify-center gap-1 mb-3">
        {renderStars()}
        <span className="ml-2 font-semibold text-slate-700 text-base">{reputation.toFixed(1)}</span>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {verified && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
            ✅ Verificado
          </span>
        )}
        <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
          📍 Arequipa
        </span>
      </div>

      {stats && (
        <div className="flex justify-around py-3 bg-gray-100 rounded-xl">
          <div className="text-center">
            <span className="block text-lg font-bold text-orange-500">{stats.totalWorks}</span>
            <span className="text-xs text-gray-600">Trabajos</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-orange-500">{stats.monthsActive}</span>
            <span className="text-xs text-gray-600">Meses</span>
          </div>
        </div>
      )}
    </div>
  )
}