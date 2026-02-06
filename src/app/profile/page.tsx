'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProfileHeader } from '@/components/ui/ProfileHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { obtenerPerfilActual, obtenerTrabajosComoWorks, inicializarDatos } from '@/lib/intelligence'
import { getWorker } from '@/lib/data'
import { logoutUser } from '@/lib/auth'

export default function ProfilePage() {
  const [perfil, setPerfil] = useState<any>(null)
  const [trabajos, setTrabajos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Inicializar y cargar datos
    inicializarDatos()
    
    const perfilActual = obtenerPerfilActual()
    const trabajosActuales = obtenerTrabajosComoWorks()
    
    setPerfil(perfilActual)
    setTrabajos(trabajosActuales)
    setIsLoading(false)
  }, [])

  // Usar datos del worker para información estática
  const worker = getWorker()

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logoutUser()
      window.location.href = '/onboarding'
    }
  }

  if (isLoading) {
    return (
      <div className="container-mobile flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="container-mobile">
        <div className="text-center py-8">
          <p className="text-gray-600">Error al cargar el perfil</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-mobile">
      <ProfileHeader 
        name={perfil.nombre}
        trade={perfil.oficio || worker.trade}
        avatar={perfil.avatar || worker.avatar}
        reputation={perfil.reputacion}
        verified={true}
        stats={{
          totalWorks: perfil.totalTrabajos,
          monthsActive: worker.stats.monthsActive,
          zonesCovered: worker.stats.zonesCovered,
        }}
      />

      <main id="main-content" className="main-content py-6" role="main" aria-label="Perfil del usuario">
        {/* Mensaje positivo sobre mejora real */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⭐</div>
            <div>
              <p className="font-bold text-green-800">Tu reputación está subiendo</p>
              <p className="text-sm text-green-600">
                {perfil.reputacion.toFixed(1)} estrellas • {perfil.totalTrabajos} trabajos registrados
              </p>
            </div>
          </div>
        </div>

        {/* Mis trabajos - evidencia real */}
        <Card>
          <h3 className="font-bold text-lg mb-3">Mis trabajos ({trabajos.length})</h3>
          {trabajos.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {trabajos.slice(0, 6).map((trabajo) => (
                <div key={trabajo.id} className="aspect-square overflow-hidden rounded-lg shadow-sm bg-gray-100">
                  <img
                    src={trabajo.image}
                    alt={trabajo.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      (e.target as HTMLImageElement).src = '/images/work-placeholder.jpg'
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">Aún no tienes trabajos registrados</p>
              <Link href="/register-work">
                <Button variant="primary" icon="📸">
                  Registrar tu primer trabajo
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Insignias ganadas - basadas en logros reales */}
        {perfil.insignias && perfil.insignias.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-2">Tus logros</h3>
            <div className="flex flex-wrap gap-2">
              {perfil.insignias.map((insignia: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full"
                >
                  🏆 {insignia}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Consejo positivo - basado en datos reales */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 Sigue registrando tus trabajos para que más gente confíe en ti
          </p>
        </div>

        <Link href="/register-work">
          <Button 
            variant="outline"
            icon="📸"
            className="mt-4"
          >
            Agregar Nuevo Trabajo
          </Button>
        </Link>

        {/* Cerrar sesión */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  )
}
