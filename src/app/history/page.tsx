'use client'

import { useState } from 'react'
import Link from 'next/link'
import { WorkCard } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BottomNav } from '@/components/layout/BottomNav'
import { mockWorker } from '@/lib/data'

export default function HistoryPage() {
  const recentWorks = mockWorker.works.map(work => ({
    id: work.id,
    title: work.title,
    type: work.type,
    zone: work.zone,
    image: work.image,
    date: work.date,
    status: 'Completado'
  }))

  return (
    <div className="container-mobile">
      <header className="text-center py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">📋 Tus Trabajos</h1>
        <p className="text-gray-600 text-base">Todo lo que has hecho</p>
      </header>

      <main className="main-content py-6">
        <div className="space-y-3">
          {recentWorks.map((work) => (
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

        {/* Botón para agregar más */}
        <Link href="/register-work">
          <button className="w-full bg-orange-500 text-white font-semibold rounded-xl py-4 px-6 text-lg shadow-lg hover:bg-orange-600 transition-colors mt-4">
            📸 Agregar Nuevo Trabajo
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