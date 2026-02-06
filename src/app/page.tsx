'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { BottomNav } from '@/components/layout/BottomNav'
import { obtenerPerfilActual, obtenerTrabajosComoWorks, inicializarDatos } from '@/lib/intelligence'
import { getWorker } from '@/lib/data'

export default function HomePage() {
  const [perfil, setPerfil] = useState<any>(null)
  const [trabajos, setTrabajos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Inicializar datos
    inicializarDatos()
    
    // Cargar datos
    const perfilActual = obtenerPerfilActual()
    const trabajosActuales = obtenerTrabajosComoWorks()
    
    setPerfil(perfilActual)
    setTrabajos(trabajosActuales)
    setIsLoading(false)
  }, [])

  const worker = getWorker()
  const trabajosRecientes = trabajos.slice(0, 4)

  if (isLoading) {
    return (
      <div className="container-mobile flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="container-mobile">
        <div className="text-center py-8">
          <p className="text-gray-600">Error al cargar datos</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Reintentar
          </Button>
        </div>
        <BottomNav activeTab="home" />
      </div>
    )
  }

  return (
    <div className="container-mobile">
      <header className="text-center py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">🛠️ ChambIA</h1>
        <p className="text-gray-600 text-base">Tu trabajo genera confianza</p>
      </header>

      <main id="main-content" className="main-content py-6" role="main" aria-label="Contenido principal">
        {/* Botón principal - la acción más importante */}
        <Link href="/register-work">
          <Button 
            variant="primary"
            icon="📸"
            className="mb-6"
          >
            Registrar Trabajo de Hoy
          </Button>
        </Link>

        {/* Perfil simple - solo lo que importa */}
        <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center gap-3">
            <img 
              src={perfil.avatar || worker.avatar}
              alt={perfil.nombre}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="font-bold text-lg">{perfil.nombre}</p>
              <p className="text-sm text-gray-600">
                {perfil.reputacion.toFixed(1)} estrellas • {perfil.totalTrabajos} trabajos
              </p>
            </div>
            <div className="text-2xl">⭐</div>
          </div>
        </div>

        {/* Trabajos recientes - visuales, sin complejidad */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">
            {trabajosRecientes.length > 0 ? 'Tus trabajos recientes' : 'Comienza a registrar'}
          </h3>
          
          {trabajosRecientes.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {trabajosRecientes.map((trabajo) => (
                <div key={trabajo.id} className="aspect-square overflow-hidden rounded-lg shadow-sm bg-gray-100">
                  <img
                    src={trabajo.image}
                    alt={trabajo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/work-placeholder.jpg'
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">Aún no tienes trabajos</p>
              <p className="text-gray-400 text-sm">Registra tu primer trabajo para empezar</p>
            </div>
          )}
        </div>

        {/* Acciones rápidas - simples y claras */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/profile">
            <button className="bg-white p-4 border-2 border-gray-200 rounded-xl text-center hover:border-orange-500 transition-colors w-full">
              <div className="text-2xl mb-1">👤</div>
              <div className="text-sm font-semibold">Mi Perfil</div>
            </button>
          </Link>
          <Link href="/history">
            <button className="bg-white p-4 border-2 border-gray-200 rounded-xl text-center hover:border-orange-500 transition-colors w-full">
              <div className="text-2xl mb-1">📋</div>
              <div className="text-sm font-semibold">Ver Todos</div>
            </button>
          </Link>
        </div>

        {/* Mensaje motivacional - humano y simple */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌟</div>
            <div>
              <p className="font-bold text-green-800">
                {perfil.totalTrabajos > 0 ? '¡Vas muy bien!' : '¡Comienza hoy!'}
              </p>
              <p className="text-sm text-green-600">
                {perfil.totalTrabajos > 0 
                  ? 'Tu perfil se hace más confiable con cada trabajo'
                  : 'Registra tu primer trabajo y empieza a construir tu reputación'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="home" />
    </div>
  )
}
