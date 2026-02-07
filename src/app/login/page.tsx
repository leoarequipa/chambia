'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LocalStorageService } from '@/lib/storage'

export default function LoginPage() {
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    const perfil = LocalStorageService.getPerfil()
    if (perfil && perfil.nombre && perfil.nombre !== 'Juan Pérez') {
      router.push('/')
    }

    // Detect keyboard open/close on mobile
    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      const windowHeight = window.innerHeight
      const keyboardHeight = windowHeight - viewportHeight
      setKeyboardOpen(keyboardHeight > 150)
    }

    window.visualViewport?.addEventListener('resize', handleResize)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nombre.trim()) {
      setError('Por favor, ingresa tu nombre')
      return
    }

    if (nombre.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const perfil = LocalStorageService.getPerfil()
      if (perfil) {
        const updatedPerfil = {
          ...perfil,
          nombre: nombre.trim(),
          oficio: 'Trabajador',
          updatedAt: Date.now()
        }
        LocalStorageService.savePerfil(updatedPerfil)
      }
      
      setTimeout(() => {
        router.push('/')
      }, 400)
    } catch (err) {
      console.error('Error:', err)
      setError('Error al guardar. Inténtalo de nuevo.')
      setIsLoading(false)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div 
      className="container-mobile" 
      style={{ 
        background: 'linear-gradient(180deg, #FFF5F0 0%, #FFFFFF 100%)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Scrollable content area */}
      <div 
        style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        {/* Logo Section - Always visible */}
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: keyboardOpen ? 'flex-start' : 'center',
            paddingTop: keyboardOpen ? '24px' : '0',
            paddingBottom: '24px',
            minHeight: keyboardOpen ? 'auto' : '35vh',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Logo */}
          <div 
            style={{ 
              width: keyboardOpen ? '64px' : '80px', 
              height: keyboardOpen ? '64px' : '80px', 
              background: 'linear-gradient(135deg, #FF6B35 0%, #E85A2B 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: keyboardOpen ? '12px' : '20px',
              boxShadow: '0 8px 30px rgba(255, 107, 53, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg 
              width={keyboardOpen ? "32" : "40"} 
              height={keyboardOpen ? "32" : "40"} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>

          {/* Title */}
          <h1 style={{ 
            fontSize: keyboardOpen ? '24px' : '32px', 
            fontWeight: 700, 
            color: '#1A1A1A',
            marginBottom: '4px',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            ChambIA
          </h1>
          {!keyboardOpen && (
            <p style={{ 
              fontSize: '16px', 
              color: '#666666',
              textAlign: 'center'
            }}>
              Tu trabajo genera confianza
            </p>
          )}
        </div>

        {/* Form Section - Floats at bottom when keyboard is closed */}
        <div 
          style={{ 
            flex: keyboardOpen ? 0 : 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: keyboardOpen ? 'flex-start' : 'flex-end',
            padding: '0 24px 32px 24px',
            width: '100%',
            maxWidth: '360px',
            margin: '0 auto',
            transition: 'all 0.3s ease'
          }}
        >
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {/* Input Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                fontSize: '12px', 
                fontWeight: 600,
                color: '#666666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '8px',
                display: 'block'
              }}>
                ¿Cómo te llamas?
              </label>
              <div 
                style={{ position: 'relative' }}
                onClick={focusInput}
              >
                <div style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#808080'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  maxLength={50}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '16px 48px 16px 48px',
                    fontSize: '16px',
                    background: 'white',
                    border: '2px solid #E0E0E0',
                    borderRadius: '16px',
                    color: '#1A1A1A',
                    outline: 'none'
                  }}
                />
                <div style={{ 
                  position: 'absolute', 
                  right: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  fontSize: '12px',
                  color: '#808080'
                }}>
                  {nombre.length}/50
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding: '12px 16px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '12px',
                color: '#DC2626',
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '18px 24px',
                fontSize: '18px',
                fontWeight: 600,
                color: 'white',
                background: 'linear-gradient(135deg, #FF6B35 0%, #E85A2B 100%)',
                border: 'none',
                borderRadius: '16px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
                marginBottom: '24px'
              }}
            >
              {isLoading ? (
                <>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Ingresando...
                </>
              ) : (
                <>
                  Comenzar
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Features List - Hidden when keyboard is open */}
          {!keyboardOpen && (
            <div style={{ marginTop: '8px' }}>
              {[
                'Gratis y sin complicaciones',
                'Funciona sin internet',
                'Tus datos se guardan localmente'
              ].map((text, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: index < 2 ? '12px' : '0'
                }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#F0FDF4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: '14px', color: '#666666' }}>{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
