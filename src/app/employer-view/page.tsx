'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProfileHeader } from '@/components/ui/ProfileHeader'
import { mockWorker, mockWorkerWorks } from '@/lib/data'

export default function EmployerViewPage() {
  const router = useRouter()

  const workImages = mockWorkerWorks.slice(0, 6).map(work => ({
    id: work.id,
    src: work.image,
    alt: work.title
  }))

  const handleContact = () => {
    alert('Contactar: +51 999 888 777')
  }

  return (
    <div className="container-mobile">
      <header className="text-center py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">👷 Perfil Confiable</h1>
        <p className="text-gray-600 text-base">Trabajador verificado</p>
      </header>

      <main className="main-content py-6">
        <ProfileHeader 
          name={mockWorker.name}
          trade={mockWorker.trade}
          avatar={mockWorker.avatar}
          reputation={mockWorker.reputation}
          verified={mockWorker.verified}
          stats={mockWorker.stats}
        />

        {/* Evidencia visual - lo más importante */}
        <Card className="mt-6">
          <h3 className="font-bold text-lg mb-3">Trabajos Recientes</h3>
          <div className="grid grid-cols-2 gap-3">
            {workImages.map((image) => (
              <div key={image.id} className="aspect-square overflow-hidden rounded-lg shadow-sm">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Señales de confianza */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800 mb-2">¿Por qué confiar?</h3>
          <div className="space-y-2 text-sm text-green-700">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>Verificado con trabajos reales</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📸</span>
              <span>Evidencia fotográfica de cada trabajo</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span>{mockWorker.reputation.toFixed(1)} estrellas de reputación</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>Trabaja en Arequipa y zonas cercanas</span>
            </div>
          </div>
        </div>

        {/* Botón principal - contacto directo */}
        <Button 
          variant="primary"
          icon="📞"
          onClick={handleContact}
          className="mt-6"
        >
          Contactar Ahora
        </Button>

        <Button 
          variant="outline"
          onClick={() => router.push('/')}
          className="mt-3"
        >
          Ver Más Trabajadores
        </Button>
      </main>
    </div>
  )
}