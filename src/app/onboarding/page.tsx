'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { isFirstTime, registerUser, isAuthenticated } from '@/lib/auth'
import { workTypes } from '@/lib/data'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  
  // Datos del formulario
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [oficio, setOficio] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Verificar si ya está autenticado
    if (isAuthenticated()) {
      router.push('/')
      return
    }
    setIsLoading(false)
  }, [router])

  const validateStep1 = () => {
    if (!nombre.trim() || nombre.length < 3) {
      setError('Por favor ingresa tu nombre completo')
      return false
    }
    if (!telefono.trim() || telefono.length < 9) {
      setError('Por favor ingresa un número de teléfono válido')
      return false
    }
    setError('')
    return true
  }

  const validateStep2 = () => {
    if (!oficio) {
      setError('Por favor selecciona tu oficio principal')
      return false
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor ingresa un correo válido')
      return false
    }
    setError('')
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
    setError('')
  }

  const handleComplete = () => {
    if (!validateStep2()) return

    try {
      // Crear usuario
      registerUser({
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        oficio,
        email: email.trim().toLowerCase(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=FF6B35&color=fff&size=120`,
      })

      // Redirigir al home
      router.push('/')
    } catch (err) {
      setError('Error al crear cuenta. Intenta de nuevo.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container-mobile">
        {/* Header */}
        <div className="text-center py-8">
          <div className="text-5xl mb-4">🛠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bienvenido a ChambIA
          </h1>
          <p className="text-gray-600">
            Tu trabajo genera confianza
          </p>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mb-8">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-orange-500' : 'bg-gray-300'}`} />
          <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-orange-500' : 'bg-gray-300'}`} />
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mx-4">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Cuéntanos sobre ti
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ¿Cómo te llamas? *
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tu número de teléfono *
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: 999 888 777"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    autoComplete="tel"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Los empleadores te contactarán por este número
                  </p>
                </div>
              </div>

              <Button 
                variant="primary" 
                onClick={handleNext}
                className="mt-6"
              >
                Continuar →
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                ¿A qué te dedicas?
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selecciona tu oficio principal *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {workTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setOficio(type.name)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          oficio === type.name
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <span className="text-2xl mr-2">{type.icon}</span>
                        <span className="text-sm font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tu correo electrónico *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej: juan@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    autoComplete="email"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Para recuperar tu cuenta si cambias de celular
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="flex-1"
                >
                  ← Atrás
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleComplete}
                  className="flex-1"
                >
                  ¡Empezar!
                </Button>
              </div>
            </>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Info adicional */}
        <div className="text-center mt-8 px-4">
          <p className="text-sm text-gray-500">
            Al continuar, aceptas que ChambIA guarde tu información 
            para mostrarla a potenciales empleadores.
          </p>
        </div>
      </div>
    </div>
  )
}
