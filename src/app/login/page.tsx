'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { LocalStorageService } from '@/lib/storage'

// Material Icons
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function LoginPage() {
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Verificar si ya está logueado
  useEffect(() => {
    const perfil = LocalStorageService.getPerfil()
    if (perfil && perfil.nombre && perfil.nombre !== 'Juan Pérez') {
      // Ya hay un usuario registrado, redirigir a home
      router.push('/')
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
      // Crear o actualizar perfil con el nombre ingresado
      const perfil = LocalStorageService.getPerfil()
      if (perfil) {
        const updatedPerfil = {
          ...perfil,
          nombre: nombre.trim(),
          oficio: 'Trabajador', // Por defecto hasta que se actualice
          updatedAt: Date.now()
        }
        
        LocalStorageService.savePerfil(updatedPerfil)
      }
      
      // Pequeña pausa para mostrar feedback
      setTimeout(() => {
        router.push('/')
      }, 500)
      
    } catch (err) {
      console.error('Error:', err)
      setError('Error al guardar. Inténtalo de nuevo.')
      setIsLoading(false)
    }
  }

  return (
    <div className="container-mobile flex flex-col justify-center min-h-screen">
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[var(--md-sys-color-primary-container)] flex items-center justify-center animate-scale-in">
            <span className="text-4xl">🛠️</span>
          </div>
          <h1 className="md-headline-small text-[var(--md-sys-color-on-surface)] mb-2">
            ChambIA
          </h1>
          <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)]">
            Tu trabajo genera confianza
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="md-label-large text-[var(--md-sys-color-on-surface)] block mb-2">
              ¿Cómo te llamas?
            </label>
            <div className="bg-[var(--md-sys-color-surface-variant)] rounded-2xl flex items-center px-4">
              <span className="text-[var(--md-sys-color-on-surface-variant)] mr-3">
                <UserIcon />
              </span>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="flex-1 py-4 bg-transparent md-body-large text-[var(--md-sys-color-on-surface)] focus:outline-none"
                autoFocus
                maxLength={50}
              />
            </div>
            <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)] mt-1 text-right">
              {nombre.length}/50
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-2xl bg-[var(--md-sys-color-error-container)] text-[var(--md-sys-color-on-error-container)] animate-fade-in">
              <p className="md-body-medium">{error}</p>
            </div>
          )}

          {/* Botón */}
          <Button
            type="submit"
            variant="filled"
            icon={<CheckIcon />}
            size="large"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Ingresando...' : 'Comenzar'}
          </Button>
        </form>

        {/* Mensaje motivacional */}
        <div className="mt-8 text-center">
          <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)]">
            Registra tus trabajos y construye tu reputación profesional
          </p>
        </div>

        {/* Características */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 text-[var(--md-sys-color-on-surface-variant)]">
            <div className="w-6 h-6 rounded-full bg-[var(--md-sys-color-secondary-container)] flex items-center justify-center text-sm">
              ✓
            </div>
            <span className="md-body-medium">Gratis y sin complicaciones</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--md-sys-color-on-surface-variant)]">
            <div className="w-6 h-6 rounded-full bg-[var(--md-sys-color-secondary-container)] flex items-center justify-center text-sm">
              ✓
            </div>
            <span className="md-body-medium">Funciona sin internet</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--md-sys-color-on-surface-variant)]">
            <div className="w-6 h-6 rounded-full bg-[var(--md-sys-color-secondary-container)] flex items-center justify-center text-sm">
              ✓
            </div>
            <span className="md-body-medium">Tus datos se guardan en tu celular</span>
          </div>
        </div>
      </div>
    </div>
  )
}
