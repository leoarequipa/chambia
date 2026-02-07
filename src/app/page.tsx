'use client'

import { useState, useEffect, memo, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, FAB } from '@/components/ui/Button'
import { BottomNav } from '@/components/layout/BottomNav'
import { CardSkeleton, ImageGridSkeleton } from '@/components/ui/Skeleton'
import { obtenerPerfilActual, obtenerTrabajosComoWorks, inicializarDatos } from '@/lib/intelligence'
import { getWorker } from '@/lib/data'

// Lazy load del componente de cámara
const CameraIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
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

const PersonIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
))

const ListIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
))

const TrendingIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
))

// Componente memoizado para tarjeta de trabajo
const WorkCard = memo(function WorkCard({ trabajo, index }: { trabajo: any; index: number }) {
  return (
    <div 
      className={`md-card aspect-square overflow-hidden rounded-2xl relative group animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
    >
      <img
        src={trabajo.image}
        alt={trabajo.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/work-placeholder.jpg'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  )
})

// Componente memoizado para acceso rápido
const QuickAccessCard = memo(function QuickAccessCard({ 
  href, 
  icon, 
  title, 
  subtitle,
  color
}: { 
  href: string
  icon: React.ReactNode
  title: string
  subtitle: string
  color: string
}) {
  return (
    <Link href={href} className="block animate-fade-in-up stagger-2">
      <div className={`md-card-filled p-4 rounded-2xl md-state-layer cursor-pointer active:scale-95 transition-all duration-200 hover:shadow-md ${color}`}>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
          {icon}
        </div>
        <p className="md-label-large text-[var(--md-sys-color-on-surface)]">
          {title}
        </p>
        <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)] mt-1">
          {subtitle}
        </p>
      </div>
    </Link>
  )
})

export default function HomePage() {
  const router = useRouter()
  const [perfil, setPerfil] = useState<any>(null)
  const [trabajos, setTrabajos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Verificar autenticación primero
    const cachedPerfil = localStorage.getItem('chambia_perfil')
    if (cachedPerfil) {
      const perfilData = JSON.parse(cachedPerfil)
      // Si el nombre es el default "Juan Pérez", no está autenticado
      if (perfilData.nombre === 'Juan Pérez') {
        router.push('/login')
        return
      }
    } else {
      // No hay perfil, redirigir a login
      router.push('/login')
      return
    }
    
    // Carga rápida desde cache/localStorage si existe
    const cachedTrabajos = localStorage.getItem('chambia_trabajos')
    
    if (cachedPerfil && cachedTrabajos) {
      setPerfil(JSON.parse(cachedPerfil))
      setTrabajos(JSON.parse(cachedTrabajos))
      setIsLoading(false)
    }
    
    // Carga fresh en background
    inicializarDatos()
    
    const perfilActual = obtenerPerfilActual()
    const trabajosActuales = obtenerTrabajosComoWorks()
    
    setPerfil(perfilActual)
    setTrabajos(trabajosActuales)
    setIsLoading(false)
    
    // Cachear para próximas cargas
    localStorage.setItem('chambia_perfil', JSON.stringify(perfilActual))
    localStorage.setItem('chambia_trabajos', JSON.stringify(trabajosActuales))
  }, [router])

  const worker = getWorker()
  const trabajosRecientes = trabajos.slice(0, 4)

  if (isLoading) {
    return (
      <div className="container-mobile">
        <header className="px-4 pt-4 pb-2">
          <CardSkeleton />
        </header>
        <main className="main-content">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="h-24 bg-[var(--md-sys-color-surface-variant)] rounded-2xl animate-pulse" />
            <div className="h-24 bg-[var(--md-sys-color-surface-variant)] rounded-2xl animate-pulse" />
          </div>
          <ImageGridSkeleton count={4} />
        </main>
        <BottomNav activeTab="home" />
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="container-mobile">
        <div className="flex-1 flex items-center justify-center animate-fade-in">
          <div className="text-center">
            <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)]">
              Error al cargar datos
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
        <BottomNav activeTab="home" />
      </div>
    )
  }

  return (
    <div className="container-mobile">
      {/* Header */}
      <header className="px-4 pt-4 pb-2 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)]">
              Bienvenido
            </p>
            <h1 className="md-headline-small text-[var(--md-sys-color-on-surface)]">
              ChambIA
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center animate-scale-in">
            <span className="text-[var(--md-sys-color-on-primary-container)] font-medium">
              {perfil.nombre.charAt(0)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Profile Card */}
        <div className="md-card p-4 mb-4 animate-fade-in-up stagger-1">
          <div className="flex items-center gap-4">
            <img 
              src={perfil.avatar || worker.avatar}
              alt={perfil.nombre}
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--md-sys-color-outline-variant)]"
              loading="eager"
            />
            <div className="flex-1">
              <p className="md-title-medium text-[var(--md-sys-color-on-surface)]">
                {perfil.nombre}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-[var(--md-sys-color-primary)]">
                  <StarIcon />
                  <span className="md-label-large">{perfil.reputacion.toFixed(1)}</span>
                </div>
                <span className="text-[var(--md-sys-color-outline)]">•</span>
                <div className="flex items-center gap-1 text-[var(--md-sys-color-on-surface-variant)]">
                  <WorkIcon />
                  <span className="md-label-large">{perfil.totalTrabajos}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <QuickAccessCard 
            href="/profile"
            icon={<PersonIcon />}
            title="Mi Perfil"
            subtitle="Ver detalles"
            color="bg-[var(--md-sys-color-secondary-container)]"
          />
          <QuickAccessCard 
            href="/history"
            icon={<ListIcon />}
            title="Historial"
            subtitle={`${trabajos.length} trabajos`}
            color="bg-[var(--md-sys-color-tertiary-container)]"
          />
        </div>

        {/* Recent Works */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 animate-fade-in-up stagger-3">
            <h3 className="md-title-medium text-[var(--md-sys-color-on-surface)]">
              Trabajos recientes
            </h3>
            <Link href="/history">
              <span className="md-label-large text-[var(--md-sys-color-primary)]">
                Ver todo
              </span>
            </Link>
          </div>
          
          {trabajosRecientes.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {trabajosRecientes.map((trabajo, index) => (
                <WorkCard key={trabajo.id} trabajo={trabajo} index={index} />
              ))}
            </div>
          ) : (
            <div className="md-card-filled rounded-2xl p-8 text-center animate-fade-in-up stagger-3">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center">
                <CameraIcon />
              </div>
              <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)]">
                No tienes trabajos aún
              </p>
            </div>
          )}
        </div>

        {/* Motivational Banner */}
        <div className="md-card-filled rounded-2xl p-4 mb-4 animate-fade-in-up stagger-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--md-sys-color-tertiary-container)] flex items-center justify-center">
              <TrendingIcon />
            </div>
            <div>
              <p className="md-title-small text-[var(--md-sys-color-on-surface)]">
                {perfil.totalTrabajos > 0 ? '¡Vas muy bien!' : '¡Comienza hoy!'}
              </p>
              <p className="md-body-medium text-[var(--md-sys-color-on-surface-variant)]">
                {perfil.totalTrabajos > 0 
                  ? 'Tu perfil se hace más confiable'
                  : 'Registra tu primer trabajo'}
              </p>
            </div>
          </div>
        </div>

        {/* FAB for adding work */}
        <div className="flex justify-center mb-6 animate-fade-in-up stagger-6">
          <Link href="/register-work">
            <FAB
              icon={<CameraIcon />}
              ariaLabel="Registrar nuevo trabajo"
              variant="primary"
              size="standard"
            />
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </div>
  )
}
