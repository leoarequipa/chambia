'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FAB } from '@/components/ui/Button'
import { BottomBar } from '@/components/layout/BottomBar'
import { CardSkeleton, ImageGridSkeleton } from '@/components/ui/Skeleton'
import { obtenerPerfilActual, obtenerTrabajosComoWorks, inicializarDatos } from '@/lib/intelligence'
import { getWorker } from '@/lib/data'

const WorkCard = memo(function WorkCard({ trabajo, index }: { trabajo: any; index: number }) {
  return (
    <div 
      className="card aspect-square overflow-hidden"
      style={{ animationDelay: `${150 + index * 50}ms` }}
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

export default function HomePage() {
  const router = useRouter()
  const [perfil, setPerfil] = useState<any>(null)
  const [trabajos, setTrabajos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const cachedPerfil = localStorage.getItem('chambia_perfil')
    if (cachedPerfil) {
      const perfilData = JSON.parse(cachedPerfil)
      if (perfilData.nombre === 'Juan Pérez') {
        router.push('/login')
        return
      }
    } else {
      router.push('/login')
      return
    }
    
    const cachedTrabajos = localStorage.getItem('chambia_trabajos')
    
    if (cachedPerfil && cachedTrabajos) {
      setPerfil(JSON.parse(cachedPerfil))
      setTrabajos(JSON.parse(cachedTrabajos))
      setIsLoading(false)
    }
    
    inicializarDatos()
    
    const perfilActual = obtenerPerfilActual()
    const trabajosActuales = obtenerTrabajosComoWorks()
    
    setPerfil(perfilActual)
    setTrabajos(trabajosActuales)
    setIsLoading(false)
    
    localStorage.setItem('chambia_perfil', JSON.stringify(perfilActual))
    localStorage.setItem('chambia_trabajos', JSON.stringify(trabajosActuales))
  }, [router])

  const worker = getWorker()
  const trabajosRecientes = trabajos.slice(0, 4)

  if (isLoading) {
    return (
      <div className="container-mobile">
        <main className="main-content">
          <div style={{ marginBottom: '16px' }}>
            <CardSkeleton />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
            <div className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
          </div>
          <ImageGridSkeleton count={4} />
        </main>
        <BottomBar />
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="container-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666666' }}>Error al cargar datos</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #E85A2B 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Reintentar
          </button>
        </div>
        <BottomBar />
      </div>
    )
  }

  return (
    <div className="container-mobile">
      <main className="main-content">
        {/* Welcome Text */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', color: '#808080' }}>Bienvenido de vuelta,</p>
          <p style={{ fontSize: '20px', fontWeight: 600, color: '#1A1A1A' }}>{perfil.nombre}</p>
        </div>

        {/* Profile Card */}
        <div className="card" style={{ padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={perfil.avatar || worker.avatar}
                alt={perfil.nombre}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                width: '24px',
                height: '24px',
                background: '#22C55E',
                borderRadius: '50%',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#1A1A1A', marginBottom: '8px' }}>
                {perfil.nombre}
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 12px',
                  background: '#FFF5F0',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: '#FF6B35',
                  fontWeight: 600
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF6B35">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  {perfil.reputacion.toFixed(1)}
                </span>
                <span style={{ fontSize: '14px', color: '#666666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                  </svg>
                  {perfil.totalTrabajos} trabajos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3" style={{ marginBottom: '20px' }}>
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              borderRadius: '16px',
              padding: '16px',
              color: 'white'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>Mi Perfil</p>
              <p style={{ fontSize: '12px', opacity: 0.8 }}>Ver detalles</p>
            </div>
          </Link>
          <Link href="/history" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              borderRadius: '16px',
              padding: '16px',
              color: 'white'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>Historial</p>
              <p style={{ fontSize: '12px', opacity: 0.8 }}>{trabajos.length} trabajos</p>
            </div>
          </Link>
        </div>

        {/* Recent Works */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1A1A1A' }}>Trabajos recientes</h3>
            <Link href="/history" style={{ color: '#FF6B35', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Ver todo →
            </Link>
          </div>
          
          {trabajosRecientes.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {trabajosRecientes.map((trabajo, index) => (
                <WorkCard key={trabajo.id} trabajo={trabajo} index={index} />
              ))}
            </div>
          ) : (
            <div className="card-filled" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                background: 'linear-gradient(135deg, #FFE6DB 0%, #FFCCB8 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <p style={{ color: '#666666' }}>No tienes trabajos aún</p>
              <p style={{ fontSize: '12px', color: '#808080', marginTop: '4px' }}>¡Registra tu primer trabajo!</p>
            </div>
          )}
        </div>

        {/* Motivational Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #E85A2B 100%)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>
                {perfil.totalTrabajos > 0 ? '¡Vas muy bien!' : '¡Comienza hoy!'}
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                {perfil.totalTrabajos > 0 ? 'Tu perfil se hace más confiable' : 'Registra tu primer trabajo'}
              </p>
            </div>
          </div>
        </div>

        {/* FAB */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Link href="/register-work">
            <FAB
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              }
              ariaLabel="Registrar nuevo trabajo"
              variant="primary"
              size="large"
            />
          </Link>
        </div>
      </main>

      <BottomBar />
    </div>
  )
}
