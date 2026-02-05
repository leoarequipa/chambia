'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProfileHeader } from '@/components/ui/ProfileHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { obtenerPerfilActual } from '@/lib/intelligence'
import { mockWorker } from '@/lib/data'

export default function ProfilePage() {
  // Obtener perfil actualizado con datos reales
  const perfilReal = obtenerPerfilActual()

  const workImages = mockWorker.works.slice(0, 6).map(work => ({
    id: work.id,
    src: work.image,
    alt: work.title
  }))

  return (
    <div className="container-mobile">
      <ProfileHeader 
        name={mockWorker.name}
        trade={mockWorker.trade}
        avatar={mockWorker.avatar}
        reputation={perfilReal.reputacion}
        verified={mockWorker.verified}
        stats={mockWorker.stats}
      />

      <main className="main-content py-6">
        {/* Mensaje positivo sobre mejora real */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⭐</div>
            <div>
              <p className="font-bold text-green-800">Tu reputación está subiendo</p>
              <p className="text-sm text-green-600">
                {perfilReal.reputacion.toFixed(1)} estrellas • {perfilReal.totalTrabajos} trabajos
              </p>
            </div>
          </div>
        </div>

        {/* Mis trabajos - evidencia real */}
        <Card>
          <h3 className="font-bold text-lg mb-3">Mis trabajos</h3>
          <div className="grid grid-cols-2 gap-3">
            {workImages.map((image) => (
              <div key={image.id} className="aspect-square overflow-hidden rounded-lg shadow-sm">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Insignias ganadas - basadas en logros reales */}
        {perfilReal.insignias.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-2">Tus logros</h3>
            <div className="flex flex-wrap gap-2">
              {perfilReal.insignias.map((insignia, index) => (
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
      </main>

      <BottomNav activeTab="profile" />
    </div>
  )
}