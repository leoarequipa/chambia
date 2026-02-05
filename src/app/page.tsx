'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { BottomNav } from '@/components/layout/BottomNav'
import { obtenerPerfilActual } from '@/lib/intelligence'
import { mockWorker } from '@/lib/data'

export default function HomePage() {
  // Usar el pathname para determinar la pestaña activa
  const [pathname] = useState('/') 
  
  // Obtener perfil con datos reales
  const perfilReal = obtenerPerfilActual()

  const recentWorks = mockWorker.works.slice(0, 4).map(work => ({
    id: work.id,
    src: work.image,
    alt: work.title
  }))

  return (
    <div className="container-mobile">
      <header className="text-center py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">🛠️ ChambIA</h1>
        <p className="text-gray-600 text-base">Tu trabajo genera confianza</p>
      </header>

      <main className="main-content py-6">
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
              src={mockWorker.avatar}
              alt={mockWorker.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="font-bold text-lg">{mockWorker.name}</p>
              <p className="text-sm text-gray-600">
                {perfilReal.reputacion.toFixed(1)} estrellas • {perfilReal.totalTrabajos} trabajos
              </p>
            </div>
            <div className="text-2xl">⭐</div>
          </div>
        </div>

        {/* Trabajos recientes - visuales, sin complejidad */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Tus trabajos recientes</h3>
          <div className="grid grid-cols-2 gap-3">
            {recentWorks.map((image) => (
              <div key={image.id} className="aspect-square overflow-hidden rounded-lg shadow-sm">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
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
              <p className="font-bold text-green-800">¡Vas muy bien!</p>
              <p className="text-sm text-green-600">
                Tu perfil se hace más confiable con cada trabajo
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="home" />
    </div>
  )
}