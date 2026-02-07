'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { BottomBar } from '@/components/layout/BottomBar'
import { ProfileSkeleton } from '@/components/ui/Skeleton'
import { obtenerPerfilActual, obtenerTrabajosComoWorks, inicializarDatos } from '@/lib/intelligence'
import { getWorker } from '@/lib/data'
import { logoutUser } from '@/lib/auth'

const WorkImage = memo(function WorkImage({ trabajo, index }: { trabajo: any; index: number }) {
  return (
    <div className="card aspect-square overflow-hidden">
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
    const cachedPerfil = localStorage.getItem('chambia_perfil')
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
        <main className="main-content">
          <ProfileSkeleton />
        </main>
        <BottomBar />
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="container-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666666' }}>Error al cargar el perfil</p>
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

        {/* Profile Card */}
        <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={perfil.avatar || worker.avatar}
                alt={perfil.nombre}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                width: '28px',
                height: '28px',
                background: '#8B5CF6',
                borderRadius: '50%',
                border: '3px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '22px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>
                {perfil.nombre}
              </p>
              <p style={{ fontSize: '16px', color: '#666666', marginBottom: '8px' }}>
                {perfil.oficio || worker.trade}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#FF6B35',
                  fontWeight: 600
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6B35">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  {perfil.reputacion.toFixed(1)}
                </span>
                <span style={{ color: '#BFBFBF' }}>•</span>
                <span style={{ fontSize: '14px', color: '#808080' }}>Verificado</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid #EBEBEB'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '4px',
                marginBottom: '4px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                </svg>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#1A1A1A' }}>{perfil.totalTrabajos}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#808080' }}>Trabajos</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '4px',
                marginBottom: '4px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                </svg>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#1A1A1A' }}>{worker.stats.monthsActive}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#808080' }}>Meses</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '4px',
                marginBottom: '4px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                </svg>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#1A1A1A' }}>{worker.stats.zonesCovered}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#808080' }}>Zonas</p>
            </div>
          </div>
        </div>

        {/* Works Grid */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1A1A1A' }}>Mis trabajos</h3>
            <span style={{ 
              fontSize: '12px', 
              color: '#808080',
              background: '#F5F5F5',
              padding: '4px 12px',
              borderRadius: '12px'
            }}>
              {trabajos.length} total
            </span>
          </div>
          
          {trabajos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {trabajos.slice(0, 6).map((trabajo, index) => (
                <WorkImage key={trabajo.id} trabajo={trabajo} index={index} />
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
              <p style={{ color: '#666666', marginBottom: '8px' }}>Aún no tienes trabajos</p>
              <Link href="/register-work" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #E85A2B 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Registrar trabajo
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Badges */}
        {perfil.insignias && perfil.insignias.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
              <h3 style={{ fontWeight: 600 }}>Tus logros</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {perfil.insignias.map((insignia: string, index: number) => (
                <span key={index} style={{
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 500
                }}>
                  {insignia}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Add Work Button */}
        <Link href="/register-work" style={{ textDecoration: 'none', display: 'block', marginBottom: '16px' }}>
          <button style={{
            width: '100%',
            padding: '16px',
            background: '#F5F5F5',
            color: '#1A1A1A',
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            Agregar Nuevo Trabajo
          </button>
        </Link>

        {/* Logout */}
        <div style={{ 
          paddingTop: '20px', 
          borderTop: '1px solid #EBEBEB',
          marginBottom: '20px'
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '16px',
              background: 'transparent',
              color: '#EF4444',
              border: 'none',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </main>

      <BottomBar />
    </div>
  )
}
