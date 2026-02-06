'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { WorkCard } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BottomNav } from '@/components/layout/BottomNav'
import { obtenerTrabajosComoWorks, inicializarDatos } from '@/lib/intelligence'

export default function HistoryPage() {
  const [trabajos, setTrabajos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Inicializar y cargar datos
    inicializarDatos()
    
    const trabajosActuales = obtenerTrabajosComoWorks()
    setTrabajos(trabajosActuales)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="container-mobile flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando historial...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-mobile">
      <header className="text-center py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">📋 Tus Trabajos</h1>
        <p className="text-gray-600 text-base">
          {trabajos.length} {trabajos.length === 1 ? 'trabajo registrado' : 'trabajos registrados'}
        </p>
      </header>

      <main id="main-content" className="main-content py-6" role="main" aria-label="Historial de trabajos">
        {trabajos.length > 0 ? (
          <>
            <div className="space-y-3">
              {trabajos.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>

            {/* Mensaje final motivador */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-center">
                <div className="text-2xl mb-2">👏</div>
                <p className="font-bold text-green-800">¡Buen trabajo!</p>
                <p className="text-sm text-green-600">
                  Cada trabajo registrado hace tu perfil más fuerte
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-600 mb-2">Aún no tienes trabajos registrados</p>
            <p className="text-gray-400 text-sm mb-6">
              Comienza a registrar tus trabajos para construir tu reputación
            </p>
          </div>
        )}

        {/* Botón para agregar más */}
        <Link href="/register-work">
          <button className="w-full bg-orange-500 text-white font-semibold rounded-xl py-4 px-6 text-lg shadow-lg hover:bg-orange-600 transition-colors mt-4">
            📸 {trabajos.length > 0 ? 'Agregar Nuevo Trabajo' : 'Registrar Primer Trabajo'}
          </button>
        </Link>

        {/* Botón para volver */}
        <Link href="/">
          <Button 
            variant="outline"
            className="mt-3"
          >
            Volver al Inicio
          </Button>
        </Link>
      </main>

      <BottomNav activeTab="history" />
    </div>
  )
}
