'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { Button, IconButton } from '@/components/ui/Button'
import { BottomBar } from '@/components/layout/BottomBar'
import { ListSkeleton } from '@/components/ui/Skeleton'
import { obtenerTrabajosComoWorks, inicializarDatos } from '@/lib/intelligence'

// Material Icons memoizados
const ArrowBackIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
))

const CameraIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
))

const CalendarIcon = memo(() => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
))

const MapPinIcon = memo(() => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
))

const CheckCircleIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
))

interface Work {
  id: string
  title: string
  description: string
  type: string
  zone: string
  image: string
  date: string
  status: string
}

// Componente memoizado para item de trabajo
const WorkItem = memo(function WorkItem({ work, index }: { work: Work; index: number }) {
  return (
    <div 
      className={`md-card rounded-2xl overflow-hidden animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
    >
      <div className="flex gap-3 p-3">
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/work-placeholder.jpg'
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="md-title-small text-[var(--md-sys-color-on-surface)] truncate">
            {work.title}
          </h3>
          <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)] line-clamp-2 mt-0.5">
            {work.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-[var(--md-sys-color-on-surface-variant)]">
              <CalendarIcon />
              <span className="md-label-small">{work.date}</span>
            </div>
            <span className="text-[var(--md-sys-color-outline)]">•</span>
            <div className="flex items-center gap-1 text-[var(--md-sys-color-on-surface-variant)]">
              <MapPinIcon />
              <span className="md-label-small">{work.zone}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 bg-[var(--md-sys-color-secondary-container)] flex items-center gap-2">
        <span className="text-[var(--md-sys-color-on-secondary-container)]">
          <CheckCircleIcon />
        </span>
        <span className="md-label-medium text-[var(--md-sys-color-on-secondary-container)]">
          {work.status}
        </span>
      </div>
    </div>
  )
})

export default function HistoryPage() {
  const [trabajos, setTrabajos] = useState<Work[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carga desde cache primero
    const cachedTrabajos = localStorage.getItem('chambia_trabajos')
    
    if (cachedTrabajos) {
      setTrabajos(JSON.parse(cachedTrabajos))
      setIsLoading(false)
    }
    
    // Carga fresh
    inicializarDatos()
    
    const trabajosActuales = obtenerTrabajosComoWorks()
    setTrabajos(trabajosActuales)
    setIsLoading(false)
    
    // Actualizar cache
    localStorage.setItem('chambia_trabajos', JSON.stringify(trabajosActuales))
  }, [])

  if (isLoading) {
    return (
      <div className="container-mobile">
        <main className="main-content">
          <ListSkeleton count={4} />
        </main>
        <BottomBar />
      </div>
    )
  }

  return (
    <div className="container-mobile">

      {/* Main Content */}
      <main className="main-content">
        {trabajos.length > 0 ? (
          <>
            {/* Works List */}
            <div className="space-y-3 mb-6">
              {trabajos.map((work, index) => (
                <WorkItem key={work.id} work={work} index={index} />
              ))}
            </div>

            {/* Success Message */}
            <div className="rounded-2xl p-4 text-center bg-[var(--md-sys-color-secondary-container)] mb-6 animate-fade-in-up stagger-5">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center bg-[var(--md-sys-color-secondary)]">
                <CheckCircleIcon />
              </div>
              <p className="md-title-small text-[var(--md-sys-color-on-secondary-container)]">
                ¡Buen trabajo!
              </p>
              <p className="md-body-medium text-[var(--md-sys-color-on-secondary-container)] opacity-80">
                Cada trabajo registrado hace tu perfil más fuerte
              </p>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-[var(--md-sys-color-surface-variant)] mb-4">
              <CameraIcon />
            </div>
            <p className="md-title-small text-[var(--md-sys-color-on-surface)] mb-1">
              Aún no tienes trabajos
            </p>
            <p className="md-body-medium text-[var(--md-sys-color-on-surface-variant)] mb-6">
              Comienza a registrar tus trabajos
            </p>
          </div>
        )}

        {/* Add Work Button */}
        <Link href="/register-work" className="block animate-fade-in-up stagger-6">
          <Button 
            variant="filled"
            icon={<CameraIcon />}
            size="large"
          >
            {trabajos.length > 0 ? 'Agregar Nuevo Trabajo' : 'Registrar Primer Trabajo'}
          </Button>
        </Link>
      </main>

      <BottomBar />
    </div>
  )
}
