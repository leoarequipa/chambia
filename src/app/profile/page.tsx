'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { Button, IconButton } from '@/components/ui/Button'
import { BottomNav } from '@/components/layout/BottomNav'
import { ProfileSkeleton } from '@/components/ui/Skeleton'
import { obtenerPerfilActual, obtenerTrabajosComoWorks, inicializarDatos } from '@/lib/intelligence'
import { getWorker } from '@/lib/data'
import { logoutUser } from '@/lib/auth'

// Material Icons memoizados
const ArrowBackIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
))

const StarIcon = memo(() => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
))

const WorkIcon = memo(() => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
))

const CalendarIcon = memo(() => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
))

const MapPinIcon = memo(() => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
))

const CameraIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
))

const LogoutIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
))

const VerifiedIcon = memo(() => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
))

// Componente memoizado para imagen de trabajo
const WorkImage = memo(function WorkImage({ trabajo, index }: { trabajo: any; index: number }) {
  return (
    <div 
      className={`md-card aspect-square overflow-hidden rounded-2xl animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
    >
      <img
        src={trabajo.image}
        alt={trabajo.title}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/work-placeholder.jpg'
        }}
      />
    </div>
  )
})

export default function ProfilePage() {
  const [perfil, setPerfil] = useState<any>(null)
  const [trabajos, setTrabajos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carga desde cache primero
    const cachedPerfil = localStorage.getItem('chambia_perfil')
    const cachedTrabajos = localStorage.getItem('chambia_trabajos')
    
    if (cachedPerfil && cachedTrabajos) {
      setPerfil(JSON.parse(cachedPerfil))
      setTrabajos(JSON.parse(cachedTrabajos))
      setIsLoading(false)
    }
    
    // Carga fresh
    inicializarDatos()
    
    const perfilActual = obtenerPerfilActual()
    const trabajosActuales = obtenerTrabajosComoWorks()
    
    setPerfil(perfilActual)
    setTrabajos(trabajosActuales)
    setIsLoading(false)
    
    // Actualizar cache
    localStorage.setItem('chambia_perfil', JSON.stringify(perfilActual))
    localStorage.setItem('chambia_trabajos', JSON.stringify(trabajosActuales))
  }, [])

  const worker = getWorker()

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logoutUser()
    }
  }

  if (isLoading) {
    return (
      <div className="container-mobile">
        <header className="md-top-app-bar-small px-4">
          <div className="flex items-center gap-4 w-full">
            <Link href="/">
              <IconButton 
                icon={<ArrowBackIcon />}
                ariaLabel="Volver"
                variant="standard"
              />
            </Link>
            <h1 className="md-title-large text-[var(--md-sys-color-on-surface)]">
              Mi Perfil
            </h1>
          </div>
        </header>
        <main className="main-content">
          <ProfileSkeleton />
        </main>
        <BottomNav activeTab="profile" />
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="container-mobile">
        <div className="flex-1 flex items-center justify-center animate-fade-in">
          <div className="text-center">
            <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)]">
              Error al cargar el perfil
            </p>
            <Button 
              variant="filled" 
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Reintentar
            </Button>
          </div>
        </div>
        <BottomNav activeTab="profile" />
      </div>
    )
  }

  return (
    <div className="container-mobile">
      {/* Top App Bar */}
      <header className="md-top-app-bar-small px-4 animate-fade-in">
        <div className="flex items-center gap-4 w-full">
          <Link href="/">
            <IconButton 
              icon={<ArrowBackIcon />}
              ariaLabel="Volver"
              variant="standard"
            />
          </Link>
          <h1 className="md-title-large text-[var(--md-sys-color-on-surface)]">
            Mi Perfil
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Profile Card */}
        <div className="md-card p-5 mb-4 animate-fade-in-up stagger-1">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={perfil.avatar || worker.avatar}
                alt={perfil.nombre}
                className="w-20 h-20 rounded-full object-cover border-2 border-[var(--md-sys-color-outline-variant)]"
                loading="eager"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[var(--md-sys-color-tertiary)] flex items-center justify-center">
                <span className="text-white"><VerifiedIcon /></span>
              </div>
            </div>
            <div className="flex-1">
              <p className="md-headline-small text-[var(--md-sys-color-on-surface)]">
                {perfil.nombre}
              </p>
              <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)]">
                {perfil.oficio || worker.trade}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-[var(--md-sys-color-primary)]">
                  <StarIcon />
                  <span className="md-label-large font-bold">{perfil.reputacion.toFixed(1)}</span>
                </div>
                <span className="text-[var(--md-sys-color-outline)]">•</span>
                <span className="md-label-medium text-[var(--md-sys-color-on-surface-variant)]">
                  Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around mt-5 pt-4 border-t border-[var(--md-sys-color-outline-variant)]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[var(--md-sys-color-on-surface)]">
                <WorkIcon />
                <span className="md-title-medium font-bold">{perfil.totalTrabajos}</span>
              </div>
              <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)]">Trabajos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[var(--md-sys-color-on-surface)]">
                <CalendarIcon />
                <span className="md-title-medium font-bold">{worker.stats.monthsActive}</span>
              </div>
              <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)]">Meses</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[var(--md-sys-color-on-surface)]">
                <MapPinIcon />
                <span className="md-title-medium font-bold">{worker.stats.zonesCovered}</span>
              </div>
              <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)]">Zonas</p>
            </div>
          </div>
        </div>

        {/* Works Grid */}
        <div className="mb-6 animate-fade-in-up stagger-2">
          <h3 className="md-title-medium text-[var(--md-sys-color-on-surface)] mb-3">
            Mis trabajos ({trabajos.length})
          </h3>
          
          {trabajos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {trabajos.slice(0, 6).map((trabajo, index) => (
                <WorkImage key={trabajo.id} trabajo={trabajo} index={index} />
              ))}
            </div>
          ) : (
            <div className="md-card-filled rounded-2xl p-8 text-center animate-fade-in-up">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center">
                <CameraIcon />
              </div>
              <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)] mb-2">
                Aún no tienes trabajos
              </p>
              <Link href="/register-work">
                <Button variant="filled" size="small">
                  Registrar trabajo
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Badges */}
        {perfil.insignias && perfil.insignias.length > 0 && (
          <div className="rounded-2xl p-4 mb-6 bg-[var(--md-sys-color-tertiary-container)] animate-fade-in-up stagger-4">
            <h3 className="md-title-small text-[var(--md-sys-color-on-tertiary-container)] mb-3">
              Tus logros
            </h3>
            <div className="flex flex-wrap gap-2">
              {perfil.insignias.map((insignia: string, index: number) => (
                <span 
                  key={index}
                  className={`px-4 py-2 rounded-full md-label-medium bg-[var(--md-sys-color-tertiary)] text-[var(--md-sys-color-on-tertiary)] animate-fade-in-up stagger-${Math.min(index + 5, 6)}`}
                >
                  {insignia}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Add Work Button */}
        <Link href="/register-work" className="block mb-6 animate-fade-in-up stagger-5">
          <Button 
            variant="outlined"
            icon={<CameraIcon />}
            size="large"
          >
            Agregar Nuevo Trabajo
          </Button>
        </Link>

        {/* Logout */}
        <div className="pt-6 border-t border-[var(--md-sys-color-outline-variant)] animate-fade-in-up stagger-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl md-body-large font-medium text-[var(--md-sys-color-error)] active:bg-[var(--md-sys-color-error-container)] transition-colors"
          >
            <LogoutIcon />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab="profile" />
    </div>
  )
}
